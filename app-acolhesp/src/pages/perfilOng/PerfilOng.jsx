import React, { useEffect } from "react";
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

    const [ ong, setOng ] = React.useState();
    const [ publications, setPublications ] = React.useState();

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const { id } = useParams();
    
    const imagemOng = fotoPadrao;
    
    useEffect(()=> {

        const getOng = async () => {
            let resp = await api.get(`/ngos/${id}`).catch(console.error);
            setOng(resp.data);
        }

        const getPostsOng = async () => {
            let resp = await api.get(`/posts/publisher/${id}`).catch(console.error);
            setPublications(resp.data);
        }

        getOng();
        getPostsOng();

    }, []);

    console.log(JSON.stringify(ong));
    console.log(JSON.stringify(publications));
    
    document.title = 'Perfil';

    return (
        <>
            <Navbar/>

            <div className="container">
                <div className="capa-ong">
                    <div className="content">

                        {
                            ong !== undefined 
                            ? <img src={imagemOng} alt="" className="img-ong"/>
                            : <></>
                        }
                        <div className="descricao">
                            <div className="inside-capa">
                            {
                                ong !== undefined 
                                ? <span>{ong.name}</span>
                                : <span>Cachorro sem dono</span>
                            }

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
                    {/* {
                        publications !== undefined && ong !== undefined
                        ? publications.map(pub => 
                            <Publication 
                            id= {pub.id}
                            imagem={pub.imagem}
                            nome={ong.nome}
                            data= {pub.data}
                            descricao={pub.descricao}
                            imagemPublicacao={pub.imagem} 
                            />)
                        : <></>
                    } */}
                </div>

            </div>

        </>
    )
}

export default PerfilOng;