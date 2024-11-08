import axios from "axios";
import * as Yup from "yup";

export async function listDocuments() {
  const { data } = await axios.get(`/documents`);
  return data;
}
export async function findDocument(id) {
  const { data } = await axios.get(`/documents/${id}`);
  return data;
}
export async function createDocument(form) {
  const response = await axios.post(`/documents`, form.body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
export async function updateDocument(id, form) {
  const formData = new FormData(); 
  formData.append('form', form.body);
  
  const { data } = await axios.put(`/documents/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });  
  return data;
}
export async function destroyDocument(id) {
  const { data } = await axios.delete(`/documents/${id}`);
  return data;
}
export const validationSchema = Yup.object({
  client_id: Yup.number().required("Campo obrigatório"),
  estoque_id: Yup.number().required("Campo obrigatório"),
  data: Yup.string().required("Campo obrigatório"),
  categoria: Yup.string().required("Campo obrigatório"),
  quantidade: Yup.string().required("Campo obrigatório"),
  preco: Yup.number().required("Campo obrigatório"),
});
export const initialValuesFields = {
  client_id: '',
  estoque_id: '',
  data: '',
  categoria: '',
  quantidade: '',
  preco: '',
}
export const Fields = [
  { id: "client_id", type: "number", label: "Cliente" },
  { id: "estoque_id", type: "number", label: "Descrição" },
  { id: "data", type: "date", label: "Data da venda" },
  { id: "categoria", type: "text", label: "Categoria" },
  { id: "quantidade", type: "number", label: "Quantidade" },
  { id: "preco", type: "number", label: "Preço" },
]