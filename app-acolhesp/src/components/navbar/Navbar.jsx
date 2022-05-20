import React from 'react';

import logoAcolhesp from '../../images/logoWithTitle.svg';
import fotoPadrao from '../../images/profileavatar.png';

import Searcher from '../searcher/Seacher';

import { useNavigate } from "react-router-dom";

import './Navbar.css';
import { Paper } from '@mui/material';
import PopFunctionNav from '../popFunctionsNav/PopFunctionsNav';

function Navbar(props) {

    const imagemUser = props.imagem ? props.imagem : fotoPadrao;

    const nomeUser = props.nome ? props.nome : 'Kelly Sandra';

    const navigate = useNavigate();

    return (
        <>
        <nav>
            <div className="container">
                <div className="content-nav">
                
                    <a onClick={() => navigate(`/home/${props.id}`)}>
                        <img src={logoAcolhesp} alt="Logo" />
                    </a>

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
                            backgroundColor: 'transparent'}} onClick={() => navigate(`/perfil-doador/${props.id}`)}>
                        
                            <img src={imagemUser} alt="image" className="avatar" />
                            <p style={{ position: 'relative', top: '0px', left: '5px' }}>{nomeUser}</p>

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