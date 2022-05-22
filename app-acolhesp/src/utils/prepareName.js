
export default function prepareName(name) {

    const nameParts = name.split(' ');

    const namePrepare = nameParts[0]+" "+nameParts[nameParts.length-1];

    return namePrepare;

}