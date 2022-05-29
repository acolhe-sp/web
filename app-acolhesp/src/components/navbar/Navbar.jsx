import React, { useEffect, useState } from 'react';

import logoAcolhesp from '../../images/logoWithTitle.svg';

import Searcher from '../searcher/Seacher';

import { useNavigate } from "react-router-dom";

import './Navbar.css';
import { Paper } from '@mui/material';
import PopFunctionNav from '../popFunctionsNav/PopFunctionsNav';

import fotoPadrao from '../../images/profileavatar.png';
import prepareName from '../../utils/prepareName';
import getImageBanco from '../../utils/getImageUser';

function Navbar(props) {

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    const [imagem, setImagem] = useState("");

    useEffect(() => {

        const initImage = async () => {
            setImagem(await getImageBanco(participante ? participante.user.id : ''));
        }

        initImage();

    }, [])

    const navigate = useNavigate();

    return (
        <>
        <nav>
            <div className="container">
                <div className="content-nav">
                
                    {
                        props.ong 
                        ?<a onClick={() => navigate(`/dashboard`)}>
                            <img src={logoAcolhesp} alt="Logo" />
                        </a>
                        :<a onClick={() => navigate(`/home`)}>
                            <img src={logoAcolhesp} alt="Logo" />
                        </a>
                    }

                    <Searcher />

                    <Paper 
                        sx={{ 
                            display: 'flex', 
                            width: 200, 
                            height: 50, 
                            alignItems: 'center',
                            p: '2px 5px',
                            backgroundColor: 'transparent'
                        }}
                        elevation={0}
                    >
                        <div style={{
                            display: 'flex', 
                            width: 200, 
                            height: 50, 
                            alignItems: 'center',
                            p: '2px 5px',
                            cursor: 'pointer',
                            backgroundColor: 'transparent'}} onClick={() => props.ong ? navigate(`/dashboard`) :navigate(`/my-profile`)}>
                        
                            <div className='containerAvatar'>
                                <img src={!!imagem === true ? imagem : fotoPadrao} alt="image" className="avatar" />
                            </div>
                            <p style={{ position: 'relative', top: '0px', left: '10px' }}>{prepareName(participante.user.name)}</p>

                        </div>

                        <PopFunctionNav />

                    </Paper>

                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;