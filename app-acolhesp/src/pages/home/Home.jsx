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
import iconAll from "../../images/all.png";
import api from "../../api";

function Home() {
    document.title = 'Início';

    const [ ongs, setOngs ] = React.useState();
    const [ category, setCategory ] = React.useState();
    
    useEffect(() => {

        const getOngs = category && category !== 0
                        ? async () => {
                            let resp = await api.get(`/ngos/categorias/${category}`).catch(console.error);
                            setOngs(resp.data || []);
                        }
                        : async () => {
                            let resp = await api.get(`/ngos/card-data`).catch(console.error);
                            setOngs(resp.data || []);
                        };

        getOngs();
        
    }, [category]);

    const cardsFiltersGroup = [
        <div onClick={() => setCategory(1)}><CardFilterContent image={iconDogs} name="Animais"/></div>,
        <div onClick={() => setCategory(2)}><CardFilterContent image={iconAssist} name="Assistência Social"/></div>,
        <div onClick={() => setCategory(3)}><CardFilterContent image={iconEduc} name="Educação e Pesquisa"/></div>,
        <div onClick={() => setCategory(4)}><CardFilterContent image={iconSaude} name="Saúde"/></div>,
        <div onClick={() => setCategory(5)}><CardFilterContent image={iconCultura} name="Cultura"/></div>,
        <div onClick={() => setCategory(6)}><CardFilterContent image={iconDefesa} name="Defesa de direitos"/></div>,
        <div onClick={() => setCategory(7)}><CardFilterContent image={iconHabit} name="Habitação"/></div>,
        <div onClick={() => setCategory(8)}><CardFilterContent image={iconAmbiente} name="Meio Ambiente"/></div>,
        <div onClick={() => setCategory(0)}><CardFilterContent image={iconAll} name="Todos"/></div>,
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
                                imagem={ong.idUser}
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