import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import getImageBanco from "../../utils/getImageUser";

import emptyAvatar from '../../images/empty-avatar.png';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { Avatar, IconButton, List, ListItemAvatar, ListItemText, ListItem, Rating } from "@mui/material";

import './PerfilDoador.css';
import api from "../../api";
import prepareName from "../../utils/prepareName";
import PopStatusDonation from "../../components/popStatusDonation/PopStatusDonation";

function PerfilDoador() {
    document.title = 'Perfil';

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const navigate = useNavigate();

    const [imagem, setImagem] = useState("");

    const [dataDonations, setDataDonations] = useState({});
    const [dataFollow, setDataFollow] = useState({});

    const [page, setPage] = useState("default");

    async function initializeComponentes(part) {
        setImagem(await getImageBanco(part.user.id));

        const respDonations = await api.get(`/donors/${part.donor.id}/donations`).catch(console.log);

        setDataDonations(respDonations.data);

        const respFollow = await api.get(`/donors/${part.donor.id}/following`).catch(console.log);

        setDataFollow(respFollow.data);
    }

    async function unfollowNgo(idOng, idDonor) {
        try {

            await api.post(`/donors/${idDonor}/follow/${idOng}`).catch(console.log);

            initializeComponentes(participante)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {

        initializeComponentes(participante);

    }, []);

    console.log(dataFollow);
    console.log(dataDonations);

    return(
        <>
            <Navbar/>

            {
                page === 'default'
                ?<div className="container">
                    <section className="home-section">
                        <div className="align_perfil">
                            <div className="perfil">
                                <div className="img_perfil">
                                    <img id="foto_perfil_usuario" src={!!imagem === true ? imagem : emptyAvatar} alt="profileImg" />
                                </div>
                    
                                <div className="info_perfil">
                                    <h4>Bem-vindo(a)!</h4>
                                    <h1 id="nome_usuario">{ participante ? participante.user.name : ''}</h1>
                    
                                    <div className="hr"></div>
                    
                                    <p onClick={() => navigate('/update-user')}>Editar Perfil</p>
                                </div>
                            </div>
                    
                            <div className="perfil" id="conquistasColab">
                                <h1>Dados</h1>
                                <div className="dados">
                                    <div className="dados_item addDetalhe" onClick={() => setPage('donations')}>
                                        <h1>Nº de doações</h1>
                                        <h1>{!!dataDonations === true ? dataDonations.qtdDonations : 0 }</h1>
                                    </div>

                                    <div className="dados_item">
                                        <h1>Valor total doado</h1>
                                        <h1>{!!dataDonations.valorTotalDoado === true ? dataDonations.valorTotalDoado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  : 'R$ 0,00'}</h1>
                                    </div>

                                    <div className="dados_item addDetalhe" onClick={() => setPage('follows')}>
                                        <h1>Ongs seguidas</h1>
                                        <h1>{!!dataFollow === true ? dataFollow.qtdNGOFollowing : 0}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            : page === 'follows'
                ? <div className="container">
                    <section className="home-section">
                        <div className="align_perfil2">
                            <div className="perfil">
                                <div className='butonWithText'>
                                    <IconButton sx={{ marginRight: '10px'}} edge="end" aria-label="voltar" onClick={() => setPage('default')}>
                                        <ArrowCircleLeftIcon fontSize="large" />
                                    </IconButton>
                                    <h1 style={{ paddingTop: '5px'}}>ONG's Seguidas</h1>
                                </div>
                                    
                                <List sx={{ minWidth: '40%', maxWidth: '100%', display: 'flex', paddingTop: '0px', flexDirection: 'row', flexWrap: 'wrap', height: 'auto' }} dense={false}>
                                    {
                                        !!dataFollow.ngosFollowing === true
                                    
                                        ? dataFollow.ngosFollowing.map(follow =>
                                            <ListItem sx={{ width: '48%', margin:'10px', background: '#a3a3a3d7', cursor: 'pointer' }}
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete" onClick={() => unfollowNgo(follow.id, participante.user.id)}>
                                                        <RemoveCircleIcon />
                                                    </IconButton>
                                                }>
                                                    
                                                <ListItemAvatar sx={{ display: 'grid', justifyItems: 'center' }} onClick={() => navigate(`/perfil-ong/${follow.id}`)}>
                                                    <Avatar>
                                                        {}
                                                    </Avatar>
                                                    <ListItemText primary={follow.user.name} />
                                                </ListItemAvatar>

                                                <ListItem sx={{ display: 'grid', justifyItems: 'center', margin: '0 auto' }} onClick={() => navigate(`/perfil-ong/${follow.id}`)}>
                                                    avaliação
                                                    <Rating name="half-rating-read" 
                                                        defaultValue={follow.assessment} 
                                                        precision={0.5} 
                                                        readOnly 
                                                        size="small"
                                                    />
                                                </ListItem>

                                                <ListItemText primary={follow.description} onClick={() => navigate(`/perfil-ong/${follow.id}`)}/>
                                          
                                            </ListItem>
                                        ) 
                                        : <></>
                                    }
                                </List>
                            </div>
                        </div>
                    </section>
                </div>
                
                : <div className="container">
                <section className="home-section">
                    <div className="align_perfil2">
                        <div className="perfil">
                            <div className='butonWithText'>
                                <IconButton sx={{ marginRight: '10px'}} edge="end" aria-label="voltar" onClick={() => setPage('default')}>
                                    <ArrowCircleLeftIcon fontSize="large" />
                                </IconButton>
                                <h1 style={{ paddingTop: '5px'}}>Doações Realizadas</h1>
                            </div>
                                
                            <List sx={{ minWidth: '40%', maxWidth: '100%', display: 'flex', paddingTop: '0px', flexDirection: 'row', flexWrap: 'wrap', height: 'auto' }} dense={false}>
                                {
                                    !!dataDonations.donations === true
                                
                                    ? dataDonations.donations.map(donation =>
                                        <ListItem sx={{ display: 'flex', justifyContent: 'center', width: '48%', margin:'10px', background: '#a3a3a3d7', pt: '10px', borderRadius: '10px' }}>
                                            
                                            <div style={{ position: 'absolute', top: '8px', right: '20px'}}>
                                                <PopStatusDonation status={donation.status} />
                                            </div>

                                            <ListItemAvatar sx={{ display: 'grid', justifyItems: 'center' }}>
                                                <Avatar>
                                                    
                                                </Avatar>
                                                <h3>{ prepareName(donation.donor.user.name) }</h3>
                                            </ListItemAvatar>
                                            
                                            <ListItem sx={{ display: 'grid', justifyItems: 'center', ml: '10px' }}>
                                                <h2>{ !!donation.payment.type.description === true ? donation.payment.type.description : '' }</h2>
                                                <ListItemText>
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                    <DoubleArrowIcon sx={{ color: 'blue', }} fontSize='large' />
                                                </ListItemText>
                                                <h2>{!!donation.payment.value === true ? donation.payment.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : 'R$ 0,00'}</h2>
                                            </ListItem>

                                            <ListItemAvatar sx={{ display: 'grid', justifyItems: 'center' }}>
                                                <Avatar>
                                                    
                                                </Avatar>
                                                <h3>{ prepareName(donation.ngo.user.name) }</h3>
                                            </ListItemAvatar>
                                      
                                        </ListItem>
                                    ) 
                                    : <></>
                                }
                            </List>
                        </div>
                    </div>
                </section>
            </div>
            }

            
        </>
    );
}

export default PerfilDoador;