import { Rating, TextField, InputBase } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";

import fotoPadrao from '../../images/profileavatar.png';

import api from '../../api';

import './CardHome.css';

async function getImage(id) {
  try {
    
    return await api.post(`/${id}`);

  } catch (err) {
    console.error(err);
  }
}

function CardHome(props) {

  const imagemOng = props.imagem ? props.imagem : fotoPadrao;

  const hasNotificacoes = props.notificacoes 
    ? <div class="news"><p>{props.notificacoes}</p></div>
    : '';

  const navigate = useNavigate();

  return (
    <>
      <div className="card" onClick={() => navigate(`/perfil-ong/${props.id}`)}>
        <a href="">
          <div className="header-card">
            
            <Rating name="half-rating-read" defaultValue={props.nota} precision={0.5} readOnly size="small" />
            
            {hasNotificacoes}
          
          </div>

          <div className="body-card">
            
            <img src={imagemOng} alt="" />
            
            <p className="name-ong"> {props.nome} </p>

            <InputBase
              id="standard-multiline-static"
              multiline
              rows={5}
              defaultValue={props.descricao}
              readOnly='true'
              sx={{
                marginTop: '5px',
                width: '90%',
                fontSize: '14px'
              }}
            />
            
            <div className="categoria-card">{props.categoria}</div>
          </div>
        </a>
      </div>
    </>
  );
}

export default CardHome;