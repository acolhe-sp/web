import React, { useEffect } from "react";

import { InputBase } from '@mui/material';

import './Publication.css';

import fotoPadrao from '../../images/profileavatar.png';

import api from "../../api";

import iconUnlike from '../../images/unlike.png';
import iconLike from '../../images/like.png';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import prepareDataHora from "../../utils/prepareDataHora";

function Publication(props) {

    const [liked, setLiked] = React.useState();

    const idPubli = `publi${props.id}`;
    
    const iconLikeState = liked ? iconLike : iconUnlike;

    async function stateLike() {
        const resp = await api.get(`/donors/${props.idDonor}/state-like-post/${props.id}`).catch(console.log);

        setLiked(resp.data);
    }

    async function turnStateLike() {
        const resp = await api.post(`/donors/${props.idDonor}/like-post/${props.id}`).catch(console.log);

        setLiked(resp.data);
    }

    async function deletePost() {
        await api.delete(`/posts/${props.id}`).catch(console.log);

        document.getElementById(idPubli).style.display = 'none';
    }

    useEffect(() => {

        if (props.isDonor) {
            stateLike();
        }

    }, []);

    return (
        <>
            <div className="content-publi" id={idPubli}>

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
                    value={props.descricao}
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

                {
                    props.isDonor
                    ? <button selected={liked} onClick={() => turnStateLike() }>
                        <img src={iconLikeState} className="imgLike" />
                    </button>
                    : <button onClick={() => deletePost()}>
                        <DeleteForeverIcon fontSize="large" sx={{ transition: '.2s' , ':hover': { color: 'red'}}} />
                    </button>
                }

                    {/* <span>|</span>

                    <PopComentsPublication /> */}

                </div>

            </div>
        </>
    )
}

export default Publication;