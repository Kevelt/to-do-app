import axios from "axios";

const urlAPI = 'http://localhost:3000/';
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

  delete(id) {
    return axios.delete(`${urlAPI}${table}/${id}`);
  }
}

export default new TodosDataService();
