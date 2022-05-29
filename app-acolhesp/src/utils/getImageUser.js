import api from "../api";

export default async function getImageBanco(id) {
    let resp = await api.get(`/users/pic/${id}`).catch(console.log);

    return resp.data;
}