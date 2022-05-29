function resetValue() {
    document.getElementById("donation_value").value = "";
}

function resetButtons() {
    document.getElementById("btn-pix").className = "btn btn-default";
    document.getElementById("btn-credit").className = "btn btn-default";
    document.getElementById("btn-transfer").className = "btn btn-default";
}

function resetInputs() {
    document.getElementById("card_owner").value = "";
    document.getElementById("card_number").value = "";
    document.getElementById("card_expiring_date").value = "";
    document.getElementById("card_security_code").value = "";
    document.getElementById("recipient_pix_key").value = "";
    document.getElementById("account_agency").value = "";
    document.getElementById("account_number").value = "";
    document.getElementById("bank_name").value = "0";
}

function hideForms() {
    resetButtons();
    resetInputs();
    document.getElementById("pix-form").style.display = "none";
    document.getElementById("credit-form").style.display = "none";
    document.getElementById("transfer-form").style.display = "none";
}

function showPixForm() {
    if (document.getElementById("btn-pix").className != "btn btn-selected") {
        hideForms();
        document.getElementById("btn-pix").className = "btn btn-selected";
        document.getElementById("pix-form").style.display = "flex";
        document.getElementById("value-info").style.display = "flex";
        document.getElementById("cancel-confirm").style.display = "flex";
    }
}

function showCreditForm() {
    if (document.getElementById("btn-credit").className != "btn btn-selected") {
        hideForms();
        document.getElementById("btn-credit").className = "btn btn-selected";
        document.getElementById("credit-form").style.display = "flex";
        document.getElementById("value-info").style.display = "flex";
        document.getElementById("cancel-confirm").style.display = "flex";
    }
}

function showTransferForm() {
    if (document.getElementById("btn-transfer").className != "btn btn-selected") {
        hideForms();
        document.getElementById("btn-transfer").className = "btn btn-selected";
        document.getElementById("transfer-form").style.display = "flex";
        document.getElementById("value-info").style.display = "flex";
        document.getElementById("cancel-confirm").style.display = "flex";
    }
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