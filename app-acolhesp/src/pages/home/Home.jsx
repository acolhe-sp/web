import React from "react";

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


const cardsFiltersGroup = [
    <CardFilterContent image={iconDogs} name="Animais" />,
    <CardFilterContent image={iconAssist} name="Assistência Social" />,
    <CardFilterContent image={iconEduc} name="Educação e Pesquisa" />,
    <CardFilterContent image={iconSaude} name="Saúde" />,
    <CardFilterContent image={iconCultura} name="Cultura" />,
    <CardFilterContent image={iconDefesa} name="Defesa de direitos" />,
    <CardFilterContent image={iconHabit} name="Habitação" />,
    <CardFilterContent image={iconAmbiente} name="Meio Ambiente" />
];

function Home() {
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

                    <CardHome 
                        nota='4'
                        notificacoes='5'
                        nome="SãoPet"
                        descricao="Fundada apartir de um quintal, SãoPet é uma ONG na zona oeste de são paulo que foi tem o intuito de ajudar nossos amiguinhos a encontrar lar onde recebam muito amor e carinho. Existimos a mais de 20 anos ..."
                        categoria="Animal" />

                    <CardHome 
                        nota='4'
                        notificacoes='5'
                        nome="SãoPet"
                        descricao="Fundada apartir de um quintal, SãoPet é uma ONG na zona oeste de são paulo que foi tem o intuito de ajudar nossos amiguinhos a encontrar lar onde recebam muito amor e carinho. Existimos a mais de 20 anos ..."
                        categoria="Animal" />

                    <CardHome 
                        nota='4'
                        notificacoes='5'
                        nome="SãoPet"
                        descricao="Fundada apartir de um quintal, SãoPet é uma ONG na zona oeste de são paulo que foi tem o intuito de ajudar nossos amiguinhos a encontrar lar onde recebam muito amor e carinho. Existimos a mais de 20 anos ..."
                        categoria="Animal" />

                    <CardHome 
                        nota='4'
                        notificacoes='5'
                        nome="SãoPet"
                        descricao="Fundada apartir de um quintal, SãoPet é uma ONG na zona oeste de são paulo que foi tem o intuito de ajudar nossos amiguinhos a encontrar lar onde recebam muito amor e carinho. Existimos a mais de 20 anos ..."
                        categoria="Animal" />

                    <CardHome 
                        nota='4'
                        notificacoes='5'
                        nome="SãoPet"
                        descricao="Fundada apartir de um quintal, SãoPet é uma ONG na zona oeste de são paulo que foi tem o intuito de ajudar nossos amiguinhos a encontrar lar onde recebam muito amor e carinho. Existimos a mais de 20 anos ..."
                        categoria="Animal" />

                </div>
            
            </div>
        </>
    );
}

export default Home;