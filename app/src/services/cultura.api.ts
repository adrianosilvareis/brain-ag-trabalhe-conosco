import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL ?? "http://localhost:5000"}/cultura`
});

export const listarCultura = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: any) {
    console.log("Error fetching Cultura: ", error.message);
    return [];
  }
};
