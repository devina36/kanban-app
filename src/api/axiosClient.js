import axios from 'axios';

const baseURL = 'https://todo-api-18-140-52-65.rakamin.com';

export const authApi = {
  signup: (params) => axios.post(baseURL + '/signup', params),
  login: (params) => axios.post(baseURL + '/auth/login', params),
};

export const todosApi = {
  getTodos: (token) =>
    axios.get(baseURL + '/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createTodos: (params, token) =>
    axios.post(baseURL + '/todos', params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const itemsApi = {
  getItem: (todosId, token) =>
    axios.get(baseURL + `/todos/${todosId}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createItem: (todosId, params, token) =>
    axios.post(baseURL + `/todos/${todosId}/items`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateItem: (todosId, itemId, params, token) =>
    axios.patch(baseURL + `/todos/${todosId}/items/${itemId}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteItem: (todosId, itemId, token) =>
    axios.delete(baseURL + `/todos/${todosId}/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
