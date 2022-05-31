import React, { useEffect, useState } from "react";
import userProfile from "../../images/healthicons_ui-user-profile.svg"
import pix from "../../images/logo-pix-icone-1024 2.svg"
import imgCredito from "../../images/img-credito.svg"
import imgTransf from "../../images/img-transferência.svg"
import btnReset from "../../images/akar-icons_circle-x-fill.svg"
import "./PaymentModal.css"

function PaymentModal(props) {

    const [donationValue, setDonationValue] = useState("");
    const [chavePix, setChavePix] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCVV] = useState("");
    const [banco, setBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [contaCorrente, setContaCorrente] = useState("");


    function resetValue() {
        document.getElementById("donation_value").value = "";
    }

    function focusColor(inputId) {
        const selectedInput = document.getElementById(inputId);
    
        selectedInput.addEventListener('focusin', () => {
            selectedInput.className = 'input-selected'
        })
    
        selectedInput.addEventListener('focusout', () => {
            selectedInput.className = 'input-default'
        })
    }

    const [page, setPage] = useState("pix");

    useEffect(()=> {

    }, []);

    return (
        <div className="modal-frame">
            <div className="sidebar">
                <p>Você está transferindo para:</p>
                <div className="donor-info">
                    <img src={userProfile} alt="" />
                    <h3>{props.nome}</h3>
                </div>
                <hr style={{ width: '300px', height: '3px', backgroundColor: 'white'}} />
                <div className="payment-methods">
                    <p>Como deseja realizar a doação?</p>
                    <div className="btn-container">
                        <div className="btn" onClick={() => setPage('pix')} style={{ position: 'relative', top: '-80px', backgroundColor: '#ffffff', color: '#4f4f4f' }}>
                            <div className="btn-image">
                                <img src={pix} alt="" />
                            </div>
                            PIX
                        </div>
                        <div className="btn" onClick={() => setPage('credit')} style={{ position: 'relative', top: '-150px', backgroundColor: '#ffffff', color: '#4f4f4f' }}>
                            <div className="btn-image">
                                <img src={imgCredito} alt="" />
                            </div>
                            Crédito
                        </div>
                        <div className="btn" onClick={() => setPage('transfer')} style={{ position: 'relative', top: '-219px', backgroundColor: '#ffffff', color: '#4f4f4f' }}>
                            <div className="btn-image">
                                <img src={imgTransf} alt="" />
                            </div>
                            Transferência
                        </div>
                    </div>
                    <div className="checkbox-div">
                        <input type="checkbox" />
                        <p>Lembrar desta escolha para as próximas doações</p>
                    </div>
                </div>
            </div>
            <div className="payment-info">
                    
                {
                    !!page === true && page === 'default'
                    ? <></>
                    : page === 'pix'
                        ?<div className="pix-content" id="pix-form">
                            <div className="recipient-info">
                                <p>Dados do beneficiário</p>
                                <div className="input-default" id="div_recipient_pix_key">
                                    <p>Chave PIX</p>
                                    <input type="text" id="recipient_pix_key" className="large" onChange={(e) => setChavePix(e.target.value)} onFocus={() => focusColor('div_recipient_pix_key')} />
                                </div>
                            </div>
                        </div>
                        
                        : page === 'credit'
                            ?<div className="credit-content" id="credit-form">
                                <div className="card-info">
                                    <p>Dados do cartão</p>
                                    <div className="input-default" id="div_card_owner">
                                        <p>Nome do titular</p>
                                        <input type="text" id="card_owner" className="large" onChange={(e) => setNomeTitular(e.target.value)} onFocus={() => focusColor('div_card_owner')} />
                                    </div>
            
                                    <div className="input-default" id="div_card_number">
                                        <p>Número do cartão</p>
                                        <input type="text" id="card_number" className="large" onChange={(e) => setNumeroCartao(e.target.value)} onFocus={() => focusColor('div_card_number')} />
                                    </div>
            
                                    <div className="flex-row">
                                        <div className="input-default" id="div_card_expiring_date">
                                            <p>Validade</p>
                                            <input type="month" id="card_expiring_date" className="small" onChange={(e) => setValidade(e.target.value)} onFocus={() => focusColor('div_card_expiring_date')} />
                                        </div>
                                        <div className="input-default" id="div_card_security_code">
                                            <p>CVV</p>
                                            <input type="text" id="card_security_code" maxLength="3" className="small" onChange={(e) => setCVV(e.target.value)} onFocus={() => focusColor('div_card_security_code')} />
                                        </div>
                                    </div>
                                </div>
                              </div>
                              
                            : <div className="transfer-content" id="transfer-form">
                                <div className="account-info">
                                    <p>Dados da conta</p>
            
                                    <div className="input-default" id="div_bank_name">
                                        <p>Banco</p>
                                        <select id="bank_name" className="large" onChange={(e) => setBanco(e.target.value)} onFocus={() => focusColor('div_bank_name')}>
                                            <option value="0">-</option>
                                            <option value="1">Banco do Brasil</option>
                                            <option value="2">Bradesco</option>
                                            <option value="3">Caixa</option>
                                            <option value="4">Itaú</option>
                                            <option value="5">Nubank</option>
                                        </select>
                                    </div>
            
                                    <div className="flex-row">
                                        <div className="input-default" id="div_account_agency">
                                            <p>Agência</p>
                                            <input type="text" id="account_agency" className="small" onChange={(e) => setAgencia(e.target.value)} onFocus={() => focusColor('div_account_agency')} />
                                        </div>
                                        <div className="input-default" id="div_account_number">
                                            <p>Conta Corrente</p>
                                            <input type="text" id="account_number" maxLength="3" className="small" onChange={(e) => setContaCorrente(e.target.value)} onFocus={() => focusColor('div_account_number')} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                }
                
                <div className="value-info" id="value-info">
                    <p>Adicione um valor</p>
                    <div className="input-default" id="div_donation_value">
                        <p>Valor a transferir</p>
                        <input type="text" id="donation_value" className="large"
                            maxLength="36" placeholder="0,00" onChange={(e) => setDonationValue(e.target.value)} onFocus={() => focusColor('div_donation_value')} />
                    </div>
                    <div className="reset-value" onClick={() => resetValue()}>
                        <img src={btnReset} alt="" />
                    </div>
                </div>

                <div className="cancel-confirm" id="cancel-confirm">
                    <div className="flex-row space-between">
                        <div className="btn-cancel">
                            <p>Cancelar</p>
                        </div>
                        <div className="btn-confirm">
                            <p>Confirmar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentModal;