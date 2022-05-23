import React from "react";
import { useNavigate } from "react-router-dom";

import './NotFound.css';

function NotFound() {
    document.title = '404 Not Found';
    
    const navigate = useNavigate();

    return(
        <>
        <div className="content-404">
            <div className="face">
                <div className="band">
                    <div className="darkBrown"></div>
                    <div className="white"></div>
                    <div className="lightBrown"></div>
                </div>
                <div className="eyes"></div>
                <div className="dimples"></div>
                <div className="mouth"></div>
            </div>

            <h1>Oops! Página não encontrada!</h1>
            <div className="btn" onClick={() => navigate("/")}>Voltar ao Log-in</div>
        </div>
        </>
    );
}

export default NotFound;