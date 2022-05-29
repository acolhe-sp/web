import { Rating, InputBase } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fotoPadrao from '../../images/profileavatar.png';

import './CardHome.css';
import getImageBanco from '../../utils/getImageUser';

function CardHome(props) {

  const [imagem, setImagem] = useState("");

  const hasNotificacoes = props.notificacoes 
    ? <div className="news"><p>{props.notificacoes}</p></div>
    : '';


  useEffect(() => {
    
    const initImage = async () => {
        setImagem(await getImageBanco(props.imagem ? props.imagem : ''));
    }

    initImage();

  }, [])

  const navigate = useNavigate();


  return (
    <>
      <div className="card" onClick={() => navigate(`/perfil-ong/${props.id}`)}>
          <div className="header-card">
            
            <Rating name="half-rating-read" defaultValue={props.nota} precision={0.5} readOnly size="small" />
            
            {hasNotificacoes}
          
          </div>

          <div className="body-card">
            
            <img src={imagem && imagem != '' ? imagem : fotoPadrao} alt="" />
            
            <p className="name-ong"> {props.nome} </p>

            <InputBase
              id="standard-multiline-static"
              multiline
              rows={5}
              defaultValue={props.descricao}
              readOnly={true}
              sx={{
                marginTop: '5px',
                width: '90%',
                fontSize: '14px'
              }}
            />
            
            <div className="categoria-card">{props.categoria}</div>
          </div>
      </div>
    </>
  );
}

export default CardHome;