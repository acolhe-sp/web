import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import getImageBanco from "../../utils/getImageUser";

import emptyAvatar from '../../images/empty-avatar.png';

import './PerfilDoador.css';
import api from "../../api";

function PerfilDoador() {
    document.title = 'Perfil';

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const navigate = useNavigate();

    const [imagem, setImagem] = useState("");

    const [dataDonations, setDataDonations] = useState({});
    const [dataFollow, setDataFollow] = useState({});

    async function initializeComponentes(part) {
        setImagem(await getImageBanco(part.user.id));

        const respDonations = await api.get(`/donors/${part.donor.id}/donations`).catch(console.log);

        setDataDonations(respDonations.data);

        const respFollow = await api.get(`/donors/${part.donor.id}/following`).catch(console.log);

        setDataFollow(respFollow.data);
    }

    useEffect(()=> {

        initializeComponentes(participante);

    }, []);

    return(
        <>
            <Navbar/>

            <div className="container">
                <section className="home-section">
                    <div className="align_perfil">
                        <div className="perfil">
                            <div className="img_perfil">
                                <img id="foto_perfil_usuario" src={!!imagem === true ? imagem : emptyAvatar} alt="profileImg" />
                            </div>
                
                            <div className="info_perfil">
                                <h4>Bem vindo!</h4>
                                <h1 id="nome_usuario">{ participante ? participante.user.name : ''}</h1>
                
                                <div className="hr"></div>
                
                                <p onClick={() => navigate('/update-user')}>Editar Perfil</p>
                            </div>
                        </div>
                
                        <div className="perfil" id="conquistasColab">
                            <h1>Dados</h1>
                            <div className="dados">
                                <div className="dados_item">
                                    <h1>Nº de doações</h1>
                                    <h1>{!!dataDonations === true ? dataDonations.qtdDonations : 0 }</h1>
                                </div>

                                <div className="dados_item">
                                    <h1>Valor doado</h1>
                                    <h1>{dataDonations === true && dataDonations != 0 ? dataDonations.valorTotalDoado.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  : 'R$ 0,00'}</h1>
                                </div>

                                <div className="dados_item">
                                    <h1>Ongs seguidas</h1>
                                    <h1>{!!dataFollow === true ? dataFollow.qtdNGOFollowing : 0}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default PerfilDoador;