import axios from "axios";
import API from "../config";
const API = `${API}/api/ledgers`;

export const getLedgers = () => axios.get(API);

export const createLedger = (data) =>
    axios.post(API, data);

export const updateLedger = (id, data) =>
    axios.put(`${API}/${id}`, data);

export const deleteLedger = (id) =>
    axios.delete(`${API}/${id}`);

export const searchLedger = (keyword) =>
    axios.get(`${API}/search/${keyword}`);