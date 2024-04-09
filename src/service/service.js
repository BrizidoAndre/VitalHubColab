import axios from "axios";

// Declarar a porta da api
const portaApi = '4466'


//declarar o ip da máquina
const ip = '192.168.19.134'

// Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//Configurar o axios
const api = axios.create({
     baseURL: apiUrlLocal
})


export default api