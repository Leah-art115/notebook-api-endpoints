import axios from "axios";

const API_URL = "http://localhost:3000/notes";

export interface Note {
  id: number;
  title: string;
  content: string;
}

export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get<Note[]>(API_URL);
  return res.data;
};

export const addNote = async (title: string, content: string): Promise<Note> => {
  const res = await axios.post<Note>(API_URL, { title, content });
  return res.data;
};

export const updateNote = async (id: number, title: string, content: string): Promise<Note> => {
  const res = await axios.put<Note>(`${API_URL}/${id}`, { title, content });
  return res.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
