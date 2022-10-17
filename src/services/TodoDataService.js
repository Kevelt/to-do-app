import axios from "axios";

const PORT = process?.env?.PORT_API || 3003;
const urlAPI = `http://localhost:${PORT}/`;
const table = 'todos';

class TodosDataService {
  getAll() {
    return axios.get(`${urlAPI}${table}`);
  }

  create(data) {
    return axios.post(`${urlAPI}${table}`, data);
  }

  update(id, data) {
    return axios.put(`${urlAPI}${table}/${id}`, data);
  }

  updateMulti(data) {
    return axios.put(`${urlAPI}${table}`, data);
  }

  delete(id) {
    return axios.delete(`${urlAPI}${table}/${id}`);
  }

  deleteMulti(data) {
    return axios.delete(`${urlAPI}${table}/`, { data });
  }
}

export default new TodosDataService();
