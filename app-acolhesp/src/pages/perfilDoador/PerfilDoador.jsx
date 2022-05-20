import React from "react";
import Navbar from "../../components/navbar/Navbar";

function PerfilDoador() {
    document.title = 'Perfil';

    const [ participante, setParticipante ] = React.useState(null);

    useState(async ()=> {

        setParticipante(JSON.parse(sessionStorage.getItem('participante')));

    }, []);

    return(
        <>
            <Navbar id={participante.user.id}/>

        </>
    );
}

export default PerfilDoador;