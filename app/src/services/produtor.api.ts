import axios from "axios";
import { Produtor } from "../interfaces/produtor";

const api = axios.create({
  baseURL: `${
    process.env.REACT_APP_API_URL ?? "http://localhost:5000"
  }/produtor`
});

export const listarProdutores = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};

export const getProdutorById = async (id: number) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};

export const updateProdutor = async (id: number, body: Partial<Produtor>) => {
  try {
    const response = await api.put(`/${id}`, body);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};

export const createProdutor = async (body: Partial<Produtor>) => {
  try {
    const response = await api.post("/", body);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};

export const getAllProdutores = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};

export const excluirProdutor = async (id: number) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching produtor: ", error.message);
    return [];
  }
};
