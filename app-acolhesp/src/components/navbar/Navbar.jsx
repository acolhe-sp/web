import React from 'react';
import { Link } from "react-router-dom";
import logoAcolhesp from '../../images/logoWithTitle.svg';
import noImageUser from '../../images/empty-avatar.png';
import Searcher from '../searcher/Seacher';

function Navbar() {
    return (
        <>
        <nav>
            <div className="container">
                <Link to="/">
                    <img src={logoAcolhesp} alt="Logo" className="logo" />
                </Link>

                <Searcher></Searcher>

                <img src={noImageUser} alt="image" className="avatar" />
            </div>
        </nav>
        </>
    );
}

export default Navbar;