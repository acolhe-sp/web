import React from "react";
import { InputBase, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import Navbar from "../../components/navbar/Navbar";

import './PerfilOng.css';


import fotoPadrao from '../../images/profileavatar.png';
import Publication from "../../components/publication/Publication";

function PerfilOng(props) {

    const imagemOng = props.imagem ? props.imagem : fotoPadrao;

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="capa-ong">
                    <div className="content">

                        <img src={imagemOng} alt="" className="img-ong"/>

                        <div className="descricao">
                            <div className="inside-capa">
                                <span>ONG Cão Sem Dono</span>

                                <Button elevation='0' variant="follow" endIcon={<BookmarkIcon />}>
                                    Seguir
                                </Button>
                                
                            </div>

                            <InputBase
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                defaultValue="Atualmente cuidamos diariamente de quase 500 cães. Toda ajuda é sempre bem-vinda."
                                readOnly='true'
                                variant="descricao-perfil"
                            />

                            <div className="fix-align-local-button">
                                <Button elevation='0' variant="local" startIcon={<FmdGoodIcon />}>
                                    Itapecirica da Serra, Brasil
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="list-publications">

                    <Publication />

                </div>

            </div>

        </>
    )
}

export default PerfilOng;