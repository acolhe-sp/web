import React, { useEffect } from "react";

import './Home.css';

// components
import CardFilterContent from "../../components/cardFilterContent/CardFilterContent";
import CardHome from "../../components/cardHome/CardHome";
import Navbar from "../../components/navbar/Navbar";

// images
import iconDogs from "../../images/bicho-de-estimacao.png";
import iconAssist from "../../images/pessoas.png";
import iconEduc from "../../images/education.png";
import iconSaude from "../../images/medicine.png";
import iconCultura from "../../images/network.png";
import iconDefesa from "../../images/perfil.png";
import iconHabit from "../../images/casa-limpa.png";
import iconAmbiente from "../../images/planeta-terra.png";
import api from "../../api";

function Home() {
    document.title = 'Início';

    // const participante = JSON.parse(sessionStorage.getItem('participante'));

    const [ ongs, setOngs ] = React.useState();
    const [ category, setCategory ] = React.useState();

    
    useEffect(() => {

        const getOngs = async () => {
            let resp = await api.get(`/ngos/card-data`).catch(console.error);
            setOngs(resp.data || []);
        }

        getOngs();
        
    }, []);

    const cardsFiltersGroup = [
        <CardFilterContent image={iconDogs} name="Animais" onClickDo={() => setCategory(1)}/>,
        <CardFilterContent image={iconAssist} name="Assistência Social" onClickDo={() => setCategory(2)}/>,
        <CardFilterContent image={iconEduc} name="Educação e Pesquisa" onClickDo={() => setCategory(3)}/>,
        <CardFilterContent image={iconSaude} name="Saúde" onClickDo={() => setCategory(4)}/>,
        <CardFilterContent image={iconCultura} name="Cultura" onClickDo={() => setCategory(5)}/>,
        <CardFilterContent image={iconDefesa} name="Defesa de direitos" onClickDo={() => setCategory(6)}/>,
        <CardFilterContent image={iconHabit} name="Habitação" onClickDo={() => setCategory(7)}/>,
        <CardFilterContent image={iconAmbiente} name="Meio Ambiente" onClickDo={() => setCategory(8)}/>
    ];


    return (
        <>
            <Navbar />

            <br />

            <div className="container">
                <div className="group-cards-filter">
            
                    {cardsFiltersGroup}
                    
                </div>
            
                <p className="title-list"><span>ONGs</span> que achamos que você vai gostar</p>

                <div className="list-ongs">

                    {
                        ongs !== undefined 
                        ? ongs.map(ong => 
                            <CardHome 
                                id={ong.id}
                                nota={ong.assessment}
                                notificacoes={5}
                                nome={ong.name}
                                descricao={ong.description}
                                categoria={ong.category.description} 
                            />
                        )
                        : <></>
                    }


                </div>
            
            </div>
        </>
    );
}

export default Home;