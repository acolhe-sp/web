import React, { useEffect } from "react";
import { InputBase, Button, Modal, Box, Snackbar, Alert } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PaymentModal from '../../components/paymentModal/PaymentModal';

import Navbar from "../../components/navbar/Navbar";

import './PerfilOng.css';


import fotoPadrao from '../../images/profileavatar.png';
import Publication from "../../components/publication/Publication";
import { useParams } from "react-router-dom";
import api from "../../api";
import getImageBanco from "../../utils/getImageUser";

function PerfilOng() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [ imagem, setImagem ] = React.useState();
    const [ ong, setOng ] = React.useState('');
    const [ publications, setPublications ] = React.useState();
    const [ follower, isFollower ] = React.useState();

    const [openSuccessRollbackAlert, setSuccessRollbackAlert] = React.useState(false);

    const handleCloseModalRollback = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSuccessRollbackAlert(false);
    };

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const { id } = useParams();
    
    useEffect(()=> {

        const getOngData = async () => {
            let resp = await api.get(`/ngos/${id}`).catch(console.error);
            setOng(resp.data);

            setImagem(!!resp.data === true ? await getImageBanco(resp.data.idUser) : '');
        }

        getOngData();

        const listPublications = async () => {
            let resp = await api.get(`/posts/publisher/${id}`).catch(console.error);
            setPublications(resp.data);
        }

        listPublications();

        const checkFollow = async () => {
            let resp = await api.get(`/donors/${participante.donor.id}/follow/${id}`).catch(console.log);

            console.log(`resp follow: ${resp}`);
            isFollower(resp.data);
        }

        checkFollow();

    }, []);

    const alterStateFollow = async () => {
        let resp = await api.post(`/donors/${participante.donor.id}/follow/${id}`).catch(console.log);

        console.log(`resp follow: ${resp}`);

        isFollower(resp.data);
    };
    
    document.title = 'Perfil';

    return (
        <>
            <Navbar/>

            <div className="container">
                <div className="capa-ong">
                    <div className="content">

                        {
                            ong !== undefined 
                            ? <img src={imagem ? imagem : fotoPadrao} alt="" className="img-ong"/>
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

                            
                                <Button elevation={0} variant="follow" onClick={() => handleOpen()}
                                    endIcon={<VolunteerActivismIcon />}>
                                    Doar!
                                 </Button>   
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

                <div className="list-publications" style={{ position: 'relative', top: '34vh'}}>
                    {
                        !!publications === true && participante.donor.id
                        ? publications.map(pub => 
                            <Publication 
                                id= {pub.id}
                                imagem={imagem && imagem != '' ? imagem : fotoPadrao}
                                nome={pub.ngo.user.name}
                                data= {pub.dateTime}
                                descricao={pub.description}
                                imagemPublicacao={pub.img}
                                isDonor={true}
                                idDonor={participante.donor.id}
                            />)
                        : <></>
                    }
                </div>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >   
                <PaymentModal ong={ong ? ong : null} 
                                donorId={participante ? participante.donor.id : null} 
                                imagemOng={imagem} 
                                setOpenChildren={setOpen} setOpenModalRollback={setSuccessRollbackAlert} />
                
            </Modal>

            <Snackbar open={openSuccessRollbackAlert} autoHideDuration={5000} onClose={handleCloseModalRollback}>
                <Alert onClose={handleCloseModalRollback} severity="success" sx={{ fontSize: '18px', width: '80%' }}>
                    Doação desfeita com sucesso!
                </Alert>
            </Snackbar>

        </>
    )
}

export default PerfilOng;