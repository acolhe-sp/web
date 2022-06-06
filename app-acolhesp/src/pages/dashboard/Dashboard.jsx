import React, { useEffect, useState } from "react";

import "./Dashboard.css";

import Navbar from "../../components/navbar/Navbar";
import getImageBanco from "../../utils/getImageUser";
import emptyAvatar from '../../images/empty-avatar.png';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Input, InputBase, Paper, Stack } from "@mui/material";
import api from "../../api";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import Publication from "../../components/publication/Publication";
import ChartAnalytics from "../../components/chartAnalytics/ChartAnalytics";

function Dashboard() {
    document.title = 'Dashboard';

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const [imagem, setImagem] = useState("");
    const [dataDonations, setDataDonations] = useState({});
    const [dataPosts, setDataPosts] = useState({});

    const [page, setPage] = useState("dashboard");

    const navigate = useNavigate();

    const [descPost, setDescPost] = useState('');

    const [dataChart, setDataChart] = useState({
        labels: Array.isArray(dataDonations.donations) ? dataDonations.donations.map(donation => new Date(donation.dateDonation).getMonth()) : [],
        datasets: [{
            label: "Valor arrecadado",
            data: Array.isArray(dataDonations.donations) ? dataDonations.donations.map(donation => donation.payment.value) : [],
            backgroundColor: '#e98838ad',
            borderColor: '#31271b',
            borderWidth: 1
        }]
    });
    

    async function initializeComponentes() {

        setImagem(await getImageBanco(participante.user.id));

        const respDonations = await api.get(`/donations/ngo/${participante.ngo.id}`).catch(console.log);

        setDataDonations(respDonations.data);

        const respPosts = await api.get(`/posts/publisher/${participante.ngo.id}/analytics`).catch(console.log);

        setDataPosts(respPosts.data);
        
    }

    async function publish() {

        await api.post(`/posts`, {
            ngo: participante.ngo.id,
            description: descPost,
            img: null
        }).catch(console.log);

        setDescPost('');

        
        await initializeComponentes();

    }

    useEffect(() => {

        initializeComponentes();

        setDataChart({
            labels: Array.isArray(dataDonations.donations) ? dataDonations.donations.map(donation => new Date(donation.dateDonation).getMonth()) : [],
            datasets: [{
                label: "Valor arrecadado",
                data: Array.isArray(dataDonations.donations) ? dataDonations.donations.map(donation => donation.payment.value) : [],
                backgroundColor: '#e98838ad',
                borderColor: '#e98838ad',
                borderWidth: 4
            }]
        });

    }, []);

    console.log(dataDonations);
    console.log(dataPosts);

    async function exportDataDonations() {
        await api.post('/export', dataDonations.donations).catch(console.log)
    }

    return (
        <>
            <Navbar ong={true} />

            <div className="container">
                <section className="home-section">
                    <div className="align_perfil">
                        <div className="perfil" style={{ height: '320px' }}>
                            <div className="img_perfil">
                                <img id="foto_perfil_usuario" src={!!imagem === true ? imagem : emptyAvatar} alt="profileImg" />
                            </div>

                            <div className="info_perfil">
                                <h4>Bem vindo!</h4>
                                <h1 id="nome_usuario">{participante ? participante.user.name : ''}</h1>

                                <div className="hr" />

                                <div style={{ display: 'flex' }}>
                                    <p onClick={() => navigate('/update-user')} style={{ marginRight: '25px' }}>Editar Perfil</p>
                                    <p onClick={() => exportDataDonations()}>Exportar dados</p>
                                </div>
                            </div>
                        </div>

                        <div className="perfil" style={{ position: 'relative', top: '-10px', display: 'flex', alignContent: 'flex-end', height: '40px', background: '#ffffffff' }}>
                            <Button sx={{ marginRight: '10px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }} elevation={0} variant="follow" onClick={() => setPage('dashboard')}>
                                dashboard
                            </Button>
                            <Button elevation={0} variant="follow" sx={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }} onClick={() => setPage('publications')}>
                                publicações
                            </Button>
                        </div>

                        {
                            page === 'dashboard'
                                ? <>

                                    <div className="perfil" id="conquistasColab" style={{ position: 'relative', top: '-30px', zIndex: 2 }}>
                                        <h1>Dados de doações</h1>
                                        <div className="dados">
                                            <div className="dados_item addDetalhe" onClick={() => setPage('donations')}>
                                                <h1>Nº de doações recebidas</h1>
                                                <h1>{!!dataDonations === true ? dataDonations.qtdDonations : 0}</h1>
                                            </div>

                                            <div className="dados_item">
                                                <h1>Valor arrecadado</h1>
                                                <h1 style={{ color: '#518f27d7' }}>{!!dataDonations.valorTotalArrecadado === true ? dataDonations.valorTotalArrecadado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}</h1>
                                            </div>

                                            <div className="dados_item">
                                                <h1>Valor doações Pendentes</h1>
                                                <h1 style={{ color: '#bdb32ad7' }}>{!!dataDonations.valorPendenteArrecadar === true ? dataDonations.valorPendenteArrecadar.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}</h1>
                                            </div>
                                        </div>

                                        <div className="dadosAnuaisDeDoacao">
                                            <div >
                                                {
                                                    !!dataChart.datasets === true
                                                    ?<ChartAnalytics chartData={dataChart} />
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </>

                                : <>

                                    <div style={{ display: 'grid' }}>
                                        <div className="perfil" id="conquistasColab" style={{ position: 'relative', top: '-30px', zIndex: 2 }}>
                                            <h1>Dados de publicações</h1>
                                            <div className="dados">
                                                <div className="dados_item">
                                                    <h1>Nº de publicações</h1>
                                                    <h1>{!!dataPosts.qtdPosts === true ? dataPosts.qtdPosts : 0}</h1>
                                                </div>

                                                <div className="dados_item">
                                                    <h1>Média de likes/publicação</h1>
                                                    <h1>{!!dataPosts.mediaLikesPosts === true ? dataPosts.mediaLikesPosts : '0,0'}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="perfil" id="conquistasColab" style={{ position: 'relative', top: '-30px', height: '210px', width: '780px', zIndex: 2, margin: '0 auto' }}>
                                      
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                                            <div className="img_publisher">
                                                <img src={!!imagem === true ? imagem : emptyAvatar} alt="" />
                                            </div>

                                            <Paper
                                                sx={{ display: 'flex', width: 650, height: 170, alignItems: 'center', p: '2px 5px' }}
                                            >
                                                <InputBase
                                                    sx={{ width: 550, ml: 1, textAlign: 'center'  }}
                                                    placeholder="Digite aqui para publicar..."
                                                    inputProps={{ 'aria-label': 'Sobre o que deseja publicar?' }}
                                                    value={descPost}
                                                    onChange={(e) => setDescPost(e.target.value)}
                                                    multiline
                                                    rows={4}
                                                />

                                                <div style={{ display: 'grid'}}>
                                                    <Stack className="input-upload-avatar" direction="column" alignItems="center" spacing={1} style={{ position: 'relative', left: '-25px', top: '5px'}}>
                                                        <label htmlFor="icon-button-file" className="buttons" style={{ position: 'relative', top: '-10px'}}>
                                                            <Input accept="image/*" sx={{ display: 'none' }} id="icon-button-file" type="file" />
                                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                                <div className="iconSubmit"><AddPhotoAlternateIcon /></div>
                                                            </IconButton>
                                                        </label>
                                                        <IconButton type="submit">
                                                            <div className="iconSubmit"><SendIcon onClick={() => publish()}/> </div>
                                                        </IconButton>
                                                    </Stack>
                                                </div>
                                            </Paper>

                                        </div>

                                    </div>

                                    <div className="list-publications" style={{ position: 'relative', top: '0px' }}>
                                        {
                                            !!dataPosts.posts === true
                                            ? dataPosts.posts.map(pub => 
                                                <Publication
                                                    id= {pub.id}
                                                    imagem={imagem && imagem != '' ? imagem : emptyAvatar}
                                                    nome={pub.ngo.user.name}
                                                    data= {pub.dateTime}
                                                    descricao={pub.description}
                                                    imagemPublicacao={pub.img}
                                                    isDonor={false}
                                                />)
                                            : <></>
                                        }
                                    </div>

                                </>
                        }
                    </div>
                </section>
            </div>


        </>
    )
}

export default Dashboard;