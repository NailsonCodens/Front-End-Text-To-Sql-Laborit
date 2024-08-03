import axios from "axios";
const BASE_URL = process.env.BASE_URL || "https://texttosqltest.codens.com.br/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});