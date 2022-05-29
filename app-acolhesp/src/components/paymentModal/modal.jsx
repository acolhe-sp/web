import React from "react";
import userProfile from "../../images/healthicons_ui-user-profile.svg"
import pix from "../../images/logo-pix-icone-1024 2.svg"
import imgCredito from "../../images/img-credito.svg"
import imgTransf from "../../images/img-transferência.svg"
import btnReset from "../../images/akar-icons_circle-x-fill.svg"
import "./modal.css"
import "./modal.js"

<Modal payselect="credit" />

function Modal() {

    return (
        <div class="modal-frame">
        <div class="sidebar">
            <div class="donor-info">
                <p>Você está transferindo para:</p>
                <img src={userProfile} alt="" />
                <h3>{sessionStorage.getItem(nome_ong)}</h3>
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
        <div class="pix-content" id="pix-form">
                <div class="recipient-info">
                    <p>Dados do beneficiário</p>
                    <div class="input-default">
                        <p>Chave PIX</p>
                        <input type="text" id="recipient_pix_key" class="large" />
                    </div>
                </div>
            </div>
            <div class="credit-content" id="credit-form">
                <div class="card-info">
                    <p>Dados do cartão</p>
                    <div class="input-default">
                        <p>Nome do titular</p>
                        <input type="text" id="card_owner" class="large" />
                    </div>

                    <div class="input-default">
                        <p>Número do cartão</p>
                        <input type="text" id="card_number" class="large" />
                    </div>

                    <div class="flex-row">
                        <div class="input-default">
                            <p>Validade</p>
                            <input type="month" id="card_expiring_date" class="small" />
                        </div>
                        <div class="input-default">
                            <p>CVV</p>
                            <input type="text" id="card_security_code" maxlength="3" class="small" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="transfer-content" id="transfer-form">
                <div class="account-info">
                    <p>Dados da conta</p>

                    <div class="input-default">
                        <p>Banco</p>
                        <select id="bank_name" class="large">
                            <option value="0">-</option>
                            <option value="1">Banco do Brasil</option>
                            <option value="2">Bradesco</option>
                            <option value="3">Caixa</option>
                            <option value="4">Itaú</option>
                            <option value="5">Nubank</option>
                        </select>
                    </div>

                    <div class="flex-row">
                        <div class="input-default">
                            <p>Agência</p>
                            <input type="text" id="account_agency" class="small" />
                        </div>
                        <div class="input-default">
                            <p>Conta Corrente</p>
                            <input type="text" id="account_number" maxlength="3" class="small" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="value-info" id="value-info">
                <p>Adicione um valor</p>
                <div class="input-default">
                    <p>Valor a transferir</p>
                    <input type="text" id="donation_value" class="large" 
                        maxlength="36" placeholder="0,00" />
                </div>
                <div class="reset-value" onclick="resetValue()">
                    <img src={btnReset} alt="" />
                </div>
            </div>

            <div class="cancel-confirm" id="cancel-confirm">
                <div class="flex-row space-between">
                    <div class="btn-cancel">
                        <p>Cancelar</p>
                    </div>
                    <div class="btn-confirm">
                        <p>Confirmar</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Modal;