import React from "react";

import { InputBase } from '@mui/material';

import './Publication.css';

import fotoPadrao from '../../images/profileavatar.png';
import fotoPubliMock from '../../images/filhotesAdocao.jpg';

import iconUnlike from '../../images/unlike.png';
import iconLike from '../../images/like.png';
import PopComentsPublication from "../popComentsPublication/PopComentsPublication";

function Publication(props) {

    const publicationMock = {
        id: 1,
        imagem: props.imagem ? props.imagem : fotoPadrao,
        nome: 'Cão Sem Dono',
        data: '6 de maio',
        descricao: 'SÁBADO, DIA 7, TEM EVENTO DE ADOÇÃO NO IPIRANGA, SP. E vai ser lá no Auto Shopping Bandeirantes, localizado na Avenida Presidente Tancredo Neves, 600, Ipiranga, São Paulo, das 10 às 16 horas. Todos os cães castrados, com vacinas e exames em dia. Não cobramos nenhuma taxa de adoção. O Windy, foto, é um dos cães que estarão lá aguardandomuito por um lar e uma família.',
        imagemPublicacao: fotoPubliMock
    }

    const [liked, setLiked] = React.useState(false);

    const idPubli = `publi${publicationMock.id}`;
    
    const iconLikeState = liked ? iconLike : iconUnlike;

    return (
        <>
            <div className="content-publi">

                <div className="header-publi">

                    <img src={publicationMock.imagem} alt="imagem ONG" className="img-ong"/>

                    <div className="ong-name-data">
                        <p>{publicationMock.nome}</p>
                        <span>{publicationMock.data}</span>
                    </div>

                </div>

                <InputBase
                    id="standard-multiline-static"
                    multiline
                    rows={6}
                    defaultValue={publicationMock.descricao}
                    readOnly='true'
                    variant="descricao-publi"
                />

                <div className="container-img-publi">
                    <img src={publicationMock.imagemPublicacao} alt="" />
                </div>

                <div className="dinamic-items-publi">

                <button selected={liked} onClick={() => { setLiked(!liked); }}>
                    <img src={iconLikeState} className="imgLike" id={idPubli} />
                </button>

                <span>|</span>

                <PopComentsPublication />

                </div>

            </div>
        </>
    )
}

export default Publication;