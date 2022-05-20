import React, { useState } from "react";
import { InputBase, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import Navbar from "../../components/navbar/Navbar";

import './PerfilOng.css';


import fotoPadrao from '../../images/profileavatar.png';
import Publication from "../../components/publication/Publication";
import { useParams } from "react-router-dom";
import api from "../../api";

function PerfilOng() {
    
    const [ participante, setParticipante ] = React.useState(null);

    const [ ong, setOng ] = React.useState(null);

    const [ publications, setPublications ] = React.useState(null);

    const { id } = useParams();
    
    const imagemOng = props.imagem ? props.imagem : fotoPadrao;
    
    useState(async ()=> {
        
        setParticipante(JSON.parse(sessionStorage.getItem('participante')));

        setOng(await api.get(`/ngos/${id}`));

        setPublications(await api.get(`/posts/${id}`));
        
    }, []);
    
    document.title = 'Perfil';

    return (
        <>
            <Navbar id={participante.user.id}/>

            <div className="container">
                <div className="capa-ong">
                    <div className="content">

                        <img src={imagemOng} alt="" className="img-ong"/>

                        <div className="descricao">
                            <div className="inside-capa">
                                <span>ONG Cão Sem Dono</span>

                                <Button elevation={0} variant="follow" endIcon={<BookmarkIcon />}>
                                    Seguir
                                </Button>
                                
                            </div>

                            <InputBase
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                defaultValue="Atualmente cuidamos diariamente de quase 500 cães. Toda ajuda é sempre bem-vinda."
                                readOnly={true}
                                variant="descricao-perfil"
                            />

                            <div className="fix-align-local-button">
                                <Button elevation={0} variant="local" startIcon={<FmdGoodIcon />}>
                                    Itapecirica da Serra, Brasil
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="list-publications">
                    {
                        publications.map(pub => 
                            <Publication 
                            id= {pub.id}
                            imagem={o}
                            nome={ong.nome}
                            data= {pub.data}
                            descricao={pub.descricao}
                            imagemPublicacao={pub.imagem} 
                            />
                        )
                    }
                </div>

            </div>

        </>
    )
}

export default PerfilOng;