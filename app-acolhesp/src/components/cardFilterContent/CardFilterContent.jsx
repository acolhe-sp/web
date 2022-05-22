import React from "react";

import './CardFilterContent.css';

function CardFilterContent(props) {
    return(
    <>
        <div className="content-card-filter" onClick={props.onClickDo}>
            <img src={props.image}/>

            <p>{props.name}</p>            
        </div>
    </>
    );
}

export default CardFilterContent;