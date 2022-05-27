import React from "react";

import { InputBase } from '@mui/material';

import './Publication.css';

import fotoPadrao from '../../images/profileavatar.png';

import iconUnlike from '../../images/unlike.png';
import iconLike from '../../images/like.png';
import PopComentsPublication from "../popComentsPublication/PopComentsPublication";
import prepareDataHora from "../../utils/prepareDataHora";

function Publication(props) {

    const [liked, setLiked] = React.useState(false);

    const idPubli = `publi${props.id}`;
    
    const iconLikeState = liked ? iconLike : iconUnlike;

    return (
        <>
            <div className="content-publi">

                <div className="header-publi">

                    {
                        <img src={props.imagem ? props.imagem : fotoPadrao} alt="imagem ONG" className="img-ong"/>
                    }

                    <div className="ong-name-data">

                        {
                            props.nome 
                            ?<p>{props.nome}</p>
                            :<></>
                        }

                        {
                            props.data 
                            ?<span>{prepareDataHora(props.data)}</span>
                            :<></>
                        }
                        
                    </div>

                </div>

                <InputBase
                    id="standard-multiline-static"
                    multiline
                    rows={6}
                    defaultValue={props.descricao}
                    readOnly={true}
                    variant="descricao-publi"
                />

                {
                    props.imagemPublicacao != null && props.imagemPublicacao != undefined
                    ?<div className="container-img-publi">
                        <img src={props.imagemPublicacao} alt="" />
                    </div>
                    :<span></span>
                }

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