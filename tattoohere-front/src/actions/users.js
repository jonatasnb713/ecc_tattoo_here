import axios from "axios";

export async function fetchLogin(formData) {
  const { data } = await axios.post(`/users/login`, formData);
  return data;
}