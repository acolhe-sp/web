import React, { useEffect, useState } from "react";

import "./Dashboard.css";

import Navbar from "../../components/navbar/Navbar";
import getImageBanco from "../../utils/getImageUser";
import emptyAvatar from '../../images/empty-avatar.png';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import api from "../../api";

function Dashboard() {
    document.title = 'Dashboard';

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const [imagem, setImagem] = useState("");
    const [dataDonations, setDataDonations] = useState({});

    const [page, setPage] = useState("dashboard");

    const navigate = useNavigate();

    async function initializeComponentes(part) {
        
        setImagem(await getImageBanco(part.user.id));

        const respDonations = await api.get(`/donations/ngo/${part.ngo.id}`).catch(console.log);

        setDataDonations(respDonations.data);

    }

    useEffect(()=> {

        initializeComponentes(participante);

    }, []);

    console.log(dataDonations);

    return(
        <>
            <Navbar ong={true} />

            <div className="container">
                    <section className="home-section">
                        <div className="align_perfil">
                            <div className="perfil" style={{ height: '320px'}}>
                                <div className="img_perfil">
                                    <img id="foto_perfil_usuario" src={!!imagem === true ? imagem : emptyAvatar} alt="profileImg" />
                                </div>
                    
                                <div className="info_perfil">
                                    <h4>Bem vindo!</h4>
                                    <h1 id="nome_usuario">{ participante ? participante.user.name : ''}</h1>
                    
                                    <div className="hr" />
                    
                                    <p onClick={() => navigate('/update-user')}>Editar Perfil</p>
                                </div>
                            </div>
                            
                            <div className="perfil" style={{ position: 'relative', top: '-10px', display: 'flex', alignContent: 'flex-end', height: '40px', background: '#ffffffff' }}>
                                <Button sx={{ marginRight: '10px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }} elevation={0} variant="follow" onClick={() => setPage('dashboard')}>
                                    dashboard
                                </Button>
                                <Button elevation={0} variant="follow" sx={{borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'}} onClick={() => setPage('publications')}>
                                    publicações
                                </Button>
                            </div>
                            
                            {
                                page === 'dashboard'
                                ?<>
                                
                                    <div className="perfil" id="conquistasColab" style={{ position: 'relative', top: '-30px', zIndex: 2 }}>
                                        <h1>Dados</h1>
                                        <div className="dados">
                                            <div className="dados_item addDetalhe" onClick={() => setPage('donations')}>
                                                <h1>Nº de doações recebidas</h1>
                                                <h1>{!!dataDonations === true ? dataDonations.qtdDonations : 0 }</h1>
                                            </div>

                                            <div className="dados_item">
                                                <h1>Valor arrecadado</h1>
                                                <h1 style={{ color: '#518f27d7'}}>{!!dataDonations.valorTotalArrecadado === true ? dataDonations.valorTotalArrecadado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  : 'R$ 0,00'}</h1>
                                            </div>

                                            <div className="dados_item">
                                                <h1>Valor doações Pendentes</h1>
                                                <h1 style={{ color: '#bdb32ad7'}}>{!!dataDonations.valorPendenteArrecadar === true ? dataDonations.valorPendenteArrecadar.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  : 'R$ 0,00'}</h1>
                                            </div>
                                        </div>
                                    </div>
                                
                                </>

                                : <>
                                
                                    <div className="perfil" id="conquistasColab" style={{ position: 'relative', top: '-30px', zIndex: 2 }}>
                                    
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