
export default function prepareName(name) {

    const nameParts = name.split(' ');

    const namePrepare = nameParts.length > 1 
                                ? nameParts[0]+" "+nameParts[nameParts.length-1] 
                                : nameParts[0];

    return namePrepare;

}