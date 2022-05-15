import React from 'react';

import logoAcolhesp from '../../images/logoWithTitle.svg';
import fotoPadrao from '../../images/profileavatar.png';

import Searcher from '../searcher/Seacher';

import './Navbar.css';
import { Paper } from '@mui/material';
import PopFunctionNav from '../popFunctionsNav/PopFunctionsNav';

function Navbar(props) {

    const imagemUser = props.imagem ? props.imagem : fotoPadrao;

    return (
        <>
        <nav>
            <div className="container">
                <div class="content-nav">
                
                    <a href="/home">
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
                        elevation='0'
                    >
                        <img src={imagemUser} alt="image" className="avatar" />
                        <p style={{ position: 'relative', top: '0px', left: '5px' }}>Kelly Sandra</p>

                        <PopFunctionNav />

                    </Paper>

                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;