import React from "react";
import userProfile from "../../images/healthicons_ui-user-profile.svg"
import pix from "../../images/logo-pix-icone-1024 2.svg"
import imgCredito from "../../images/img-credito.svg"
import imgTransf from "../../images/img-transferência.svg"
import "./modal.css"

<Modal payselect="credit" />

function Modal() {

    return (
        <div class="modal-frame">
        <div class="sidebar">
            <div class="donor-info">
                <p>Você está transferindo para:</p>
                <img src={userProfile} alt="" />
                <h3>{}</h3>
            </div>
            <div class="payment-methods">
                <p>Como deseja realizar a doação?</p>
                <div class="btn-container">
                    <div class="btn">
                        <div class="btn-image">
                            <img src={pix} alt="" />
                        </div>
                        PIX
                    </div>
                    <div class="btn">
                        <div class="btn-image">
                            <img src={imgCredito} alt="" />
                        </div>
                        Crédito
                    </div>
                    <div class="btn">
                        <div class="btn-image">
                            <img src={imgTransf} alt="" />
                        </div>
                        Transferência
                    </div>
                </div>
                <div class="checkbox-div">
                    <input type="checkbox" />
                    <p>Lembrar desta escolha para as próximas doações</p>
                </div>
            </div>
        </div>
        <div class="payment-info">

        </div>
    </div>
    );
}

export default Modal;