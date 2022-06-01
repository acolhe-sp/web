import React, { useEffect, useState } from "react";
import userProfile from "../../images/healthicons_ui-user-profile.svg"
import pix from "../../images/logo-pix-icone-1024 2.svg"
import imgCredito from "../../images/img-credito.svg"
import imgTransf from "../../images/img-transferência.svg"
import btnReset from "../../images/akar-icons_circle-x-fill.svg"
import "./PaymentModal.css"

import api from "../../api";
import { Alert, Box, LinearProgress, Snackbar } from "@mui/material";

function PaymentModal(props) {

    const [donation, setDonation] = useState();

    const [donationValue, setDonationValue] = useState("");
    const [chavePix, setChavePix] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCVV] = useState("");
    const [banco, setBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [contaCorrente, setContaCorrente] = useState("");

    const [progressVisible, setProgressVisible] = useState(false);

    const [openSuccessCanRollbackAlert, setOpenSuccessCanRollback] = useState(false);
    const [openFailedDonationAlert, setFailedDonationAlert] = useState(false);
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSuccessCanRollback(false);
        setFailedDonationAlert(false);
    };


    function resetValue() {
        setDonationValue('');
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

    const [blockClose, setBlockClose] = useState(false);

    function closeModal() {
        if (!blockClose) {
            props.setOpenChildren(false);
        }
    }

    function validForm() {

        switch (page) {
            case 'pix':
                return chavePix.length > 7 && donationValue > 0 ? true : false;

            case 'credit':
                
                const numberCardValid = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/.test(numeroCartao)

                return !!validade === false || !numberCardValid || nomeTitular.length < 6 || cvv.length < 3 || donationValue <= 0 ? false : true;

            case 'transfer':

                console.log("infos b: "+banco +" a "+ agencia.length + " c: "+ contaCorrente.length + " don: "+ donationValue);

                return !!banco === true && banco !== 0 && agencia.length > 3 && contaCorrente.length > 6 && donationValue > 0 ? true : false;
        }

        return false;

    }

    async function realizeDonation() {

        if (!validForm()) {
            setFailedDonationAlert(true);
            return;
        }

        switch (page) {
            case 'pix':

                const objPix = {
                    donor: props.donorId,
                    ngo: props.ong.id,
                    payment: {
                        value: +donationValue,
                        type: 1
                    },
                    status: 'Pendente'
                }

                let resp1 = await api.post('/donations', objPix).catch(console.log("Deu ruim ao realizar doação!"));

                if(resp1.status === 201) {
                    setDonation(resp1.data);
                    setOpenSuccessCanRollback(true);
                }

                break;
            case 'credit':

                const objCredit = {
                    donor: props.donorId,
                    ngo: props.ong.id,
                    payment: {
                        value: donationValue,
                        type: 2
                    },
                    status: "Pendente"
                }

                let resp2 = await api.post('/donations', objCredit).catch(console.log("Deu ruim ao realizar doação!"));

                if(resp2.status === 201) {
                    setDonation(resp2.data);
                    setOpenSuccessCanRollback(true);
                }

                break;
            case 'transfer':

                const objTransfer = {
                    donor: props.donorId,
                    ngo: props.ong.id,
                    payment: {
                        value: donationValue,
                        type: 3
                    },
                    status: "Pendente"
                }

                console.log('passou, prova: '+JSON.stringify(objTransfer));

                let resp3 = await api.post('/donations', objTransfer).catch(console.log("Deu ruim ao realizar doação!"));

                if(resp3.status === 201) {
                    setDonation(resp3.data);
                    setOpenSuccessCanRollback(true);
                }

                break;
        }

        setProgressVisible(true);

        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setProgressVisible(true);
                    props.setOpenChildren(false);
                    return clearInterval(timer);
                }
                setBlockClose(true);
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
            }, 500);
    
            return () => {
            clearInterval(timer);
        };

    }

    async function rollbackDonation() {

        let resp = await api.delete(`/donations/${donation.id}`).catch(console.log("Deu ruim ao realizar rollback!"));

        if(resp.status === 201) {
            setDonation(null);
            props.setOpenChildren(false);
            props.setOpenModalRollback(true)
        }
    }

    const [page, setPage] = useState("pix");

    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        
    }, []);

    return (
        <>
            <div className="modal-frame">
                <div className="sidebar">
                    <p>Você está transferindo para:</p>
                    <div className="donor-info">
                        <img src={!!props.imagemOng === true ? props.imagemOng : userProfile} alt="" />
                        <h3>{props.ong.name}</h3>
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
                                        <input type="text" id="recipient_pix_key" className="large" value={chavePix} onChange={(e) => setChavePix(e.target.value)} onFocus={() => focusColor('div_recipient_pix_key')} />
                                    </div>
                                </div>
                            </div>
                            
                            : page === 'credit'
                                ?<div className="credit-content" id="credit-form">
                                    <div className="card-info">
                                        <p>Dados do cartão</p>
                                        <div className="input-default" id="div_card_owner">
                                            <p>Nome do titular</p>
                                            <input type="text" id="card_owner" className="large" value={nomeTitular} onChange={(e) => setNomeTitular(e.target.value)} onFocus={() => focusColor('div_card_owner')} />
                                        </div>
                
                                        <div className="input-default" id="div_card_number">
                                            <p>Número do cartão</p>
                                            <input type="text" id="card_number" maxLength={16} className="large" value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)} onFocus={() => focusColor('div_card_number')} />
                                        </div>
                
                                        <div className="flex-row">
                                            <div className="input-default" id="div_card_expiring_date">
                                                <p>Validade</p>
                                                <input type="month" id="card_expiring_date" className="small" min="2022-08" value={validade} onChange={(e) => setValidade(e.target.value)} onFocus={() => focusColor('div_card_expiring_date')} />
                                            </div>
                                            <div className="input-default" id="div_card_security_code">
                                                <p>CVV</p>
                                                <input type="text" id="card_security_code" maxLength="3" className="small" value={cvv} onChange={(e) => setCVV(e.target.value)} onFocus={() => focusColor('div_card_security_code')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                : <div className="transfer-content" id="transfer-form">
                                    <div className="account-info">
                                        <p>Dados da conta</p>
                
                                        <div className="input-default" id="div_bank_name">
                                            <p>Banco</p>
                                            <select id="bank_name" className="large" value={banco} onChange={(e) => setBanco(e.target.value)} onFocus={() => focusColor('div_bank_name')}>
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
                                                <input type="text" id="account_agency" className="small" maxLength="4" value={agencia} onChange={(e) => setAgencia(e.target.value)} onFocus={() => focusColor('div_account_agency')} />
                                            </div>
                                            <div className="input-default" id="div_account_number">
                                                <p>Conta Corrente</p>
                                                <input type="text" id="account_number" maxLength="7" className="small" value={contaCorrente} onChange={(e) => setContaCorrente(e.target.value)} onFocus={() => focusColor('div_account_number')} />
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
                                maxLength="36" placeholder="0,00" value={donationValue} onChange={(e) => setDonationValue(e.target.value)} onFocus={() => focusColor('div_donation_value')} />
                        </div>
                        <div className="reset-value" onClick={() => resetValue()}>
                            <img src={btnReset} alt="" />
                        </div>
                    </div>

                    <div className="cancel-confirm" id="cancel-confirm">
                        <div className="flex-row space-between">
                            <div className="btn-cancel" onClick={() => closeModal()}>
                                <p>Fechar</p>
                            </div>
                            <div className="btn-confirm" onClick={() => realizeDonation()}>
                                <p>Confirmar</p>
                            </div>
                        </div>
                        {
                            progressVisible
                            ?<Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={progress} />
                            </Box>
                            :<></>
                        }
                    </div>
                </div>
            </div>

            <Snackbar open={openSuccessCanRollbackAlert} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ fontSize: '18px', width: '90%' }}>
                    Doação realizada com sucesso!
                    <br />
                    <div className="btn-rollback" onClick={() => rollbackDonation()}>
                        <p>Desfazer</p>
                    </div>
                </Alert>
            </Snackbar>
            <Snackbar open={openFailedDonationAlert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ fontSize: '18px', width: '45%' }}>
                    Certifique-se de que todos os dados estão preenchidos de forma adequada!
                </Alert>
            </Snackbar>
        </>
    );
}

export default PaymentModal;