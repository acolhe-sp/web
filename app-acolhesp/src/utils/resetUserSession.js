import api from "../api";

export default async function resetUserSession(id) {

    try {
        const res = await api.get(`/users/${id}`);

        if(res.status == 200) sessionStorage.setItem("participante", JSON.stringify(res.data));
    
    } catch (err) {
        console.log(err.message);
    }

}