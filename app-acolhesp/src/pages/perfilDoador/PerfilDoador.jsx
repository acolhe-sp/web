import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

function PerfilDoador() {
    document.title = 'Perfil';

    const participante = JSON.parse(sessionStorage.getItem('participante'));

    useEffect(async ()=> {


    }, []);

    return(
        <>
            <Navbar/>

        </>
    );
}

export default PerfilDoador;