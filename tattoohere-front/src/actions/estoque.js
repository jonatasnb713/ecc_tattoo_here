import axios from "axios";
import * as Yup from "yup";

export async function listEstoque() {
  const { data } = await axios.get(`/estoque`);
  return data;
}
export async function findEstoque(id) {
  const { data } = await axios.get(`/estoque/${id}`);
  return data;
}
export async function createEstoque(formData) {
  const { data } = await axios.post(`/estoque`, formData);
  return data;
}
export async function updateEstoque(id, formData) {
  const { data } = await axios.put(`/estoque/${id}`, formData);
  return data;
}
export async function DestroyEstoque(id) {
  const { data } = await axios.delete(`/estoque/${id}`);
  return data;
}
export const validationSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório"),
  tipo: Yup.string().required("Campo obrigatório"),
  quantidade: Yup.number().required("Campo obrigatório"),
  preco: Yup.number().required("Campo obrigatório"),
});
export const initialValuesFields = {
  nome: '',
  tipo: '',
  quantidade: '',
  preco: '',
}
export const Fields = [
  { id: "nome", type: "text", label: "Produto/Serviço" },
  { id: "tipo", type: "text", label: "Categoria" },
  { id: "quantidade", type: "number", label: "Quantidade" },
  { id: "preco", type: "number", label: "Preço" },
]