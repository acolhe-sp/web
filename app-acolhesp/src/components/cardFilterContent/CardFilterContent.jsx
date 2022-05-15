import { Paper, Typography } from "@material-ui/core";
import React from "react";

import './CardFilterContent.css';

function CardFilterContent(props) {
    return(
    <>
        <div className="content-card-filter">
            <img src={props.image} alt="image"/>

            <p>{props.name}</p>            
        </div>
    </>
    );
}

export default CardFilterContent;