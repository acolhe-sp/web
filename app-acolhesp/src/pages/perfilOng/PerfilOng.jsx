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
    const [ follower, isFollower ] = React.useState();

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const { id } = useParams();
    
    const imagemOng = fotoPadrao;
    
    useEffect(()=> {

        const getOngData = async () => {
            let resp = await api.get(`/ngos/${id}`).catch(console.error);
            setOng(resp.data);
        }

        const listPublications = async () => {
            let resp = await api.get(`/posts/publisher/${id}`).catch(console.error);
            setPublications(resp.data);
        }

        const checkFollow = async () => {
            let resp = await api.get(`/donors/${participante.donor.id}/follow/${id}`).catch(console.log);

            console.log(`resp follow: ${resp}`);
            isFollower(resp.data);
        }

        getOngData();
        listPublications();
        checkFollow();

    }, []);

    const alterStateFollow = async () => {
        let resp = await api.post(`/donors/${participante.donor.id}/follow/${id}`).catch(console.log);

        console.log(`resp follow: ${resp}`);

        isFollower(resp.data);
    };

    console.log("publi: "+JSON.stringify(publications));
    console.log("ong: "+JSON.stringify(ong));
    console.log("parti: "+JSON.stringify(participante));
    
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

                            {
                                !follower 
                                ?<Button onClick={() => alterStateFollow()} elevation={0} variant="follow" 
                                    endIcon={<BookmarkIcon />}>
                                    Seguir
                                 </Button>
                                :<Button onClick={() => alterStateFollow()} elevation={0} variant="follower" 
                                    endIcon={<BookmarkIcon />}>
                                    Seguindo
                                 </Button>
                            }
                                
                            </div>

                            <InputBase
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                defaultValue={ong ? ong.description : ""}
                                readOnly={true}
                                variant="descricao-perfil"
                            />  

                            <div className="fix-align-local-button">
                                <Button elevation={0} variant="local" startIcon={<FmdGoodIcon />}>
                                    {
                                    ong 
                                        ? `${ong.address.city}, ${ong.address.state} - Rua ${ong.address.street} nº${ong.address.number}` 
                                        : ""
                                    }
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="list-publications">
                    {
                        !!publications === true
                        ? publications.map(pub => 
                            <Publication 
                                id= {pub.id}
                                imagem={pub.ngo.user ? pub.ngo.user.img : ""}
                                nome={pub.ngo.user.name}
                                data= {pub.dateTime}
                                descricao={pub.description}
                                imagemPublicacao={pub.img} 
                            />)
                        : <></>
                    }
                </div>

            </div>

        </>
    )
}

export default PerfilOng;