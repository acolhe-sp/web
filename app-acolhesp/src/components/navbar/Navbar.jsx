import React, { useEffect } from 'react';

import logoAcolhesp from '../../images/logoWithTitle.svg';

import Searcher from '../searcher/Seacher';

import { useNavigate } from "react-router-dom";

import './Navbar.css';
import { Paper } from '@mui/material';
import PopFunctionNav from '../popFunctionsNav/PopFunctionsNav';

import fotoPadrao from '../../images/profileavatar.png';
import prepareName from '../../utils/prepareName';

function Navbar() {

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    useEffect(() => {



    }, [])

    const navigate = useNavigate();

    return (
        <>
        <nav>
            <div className="container">
                <div className="content-nav">
                
                    <a onClick={() => navigate(`/home`)}>
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
                            backgroundColor: 'transparent'}} onClick={() => navigate(`/my-profile`)}>
                        
                            <img src={fotoPadrao} alt="image" className="avatar" />
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