
export default function prepareDataHora(data) {

    let date = new Date(data);

    return date.toLocaleString('pt-BR').slice(0, (date.toDateString.length-3));

}