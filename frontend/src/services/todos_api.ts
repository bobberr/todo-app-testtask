import axios from 'axios';
import type { Todo } from '../types/todo';

const API_URL = import.meta.env.VITE_API_URL + '/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTodo = async (title: string, comment: string) => {
  const res = await axios.post(API_URL, { title, comment });
  return res.data;
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
