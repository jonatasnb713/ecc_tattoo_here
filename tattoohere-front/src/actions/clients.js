import axios from "axios";
import * as Yup from "yup";

export async function listClients() {
  const { data } = await axios.get(`/clients`);
  return data;
}
export async function findClient(id) {
  const { data } = await axios.get(`/clients/${id}`);
  return data;
}
export async function createClient(formData) {
  const { data } = await axios.post(`/clients`, formData);
  return data;
}
export async function updateClient(id, formData) {
  const { data } = await axios.put(`/clients/${id}`, formData);
  return data;
}
export async function destroyClient(id) {
  const { data } = await axios.delete(`/clients/${id}`);
  return data;
}


export const validationSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cpf: Yup.string().required("Campo obrigatório"),
  telefone: Yup.string().required("Campo obrigatório"),
  endereco: Yup.string().required("Campo obrigatório"),
  bairro: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  estado: Yup.string().required("Campo obrigatório"),
  cep: Yup.string().required("Campo obrigatório"),
});

export const initialValuesFields = {
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
}

export const Fields = [
  {id:"nome", type:"text", label:"Nome"},
  {id:"email", type:"text", label:"E-mail"},
  {id:"cpf", type:"text", label:"CPF"},
  {id:"telefone", type:"text", label:"Telefone"},
  {id:"endereco", type:"text", label:"Endereco"},
  {id:"bairro", type:"text", label:"Bairro"},
  {id:"cidade", type:"text", label:"Cidade"},
  {id:"estado", type:"text", label:"Estado"},
  {id:"cep", type:"text", label:"Cep"}
]

