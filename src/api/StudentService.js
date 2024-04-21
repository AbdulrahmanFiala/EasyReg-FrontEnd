import axios from "axios";

const API_URL = "https://localhost:7242/api/students/";

export async function saveStudent(student) {
  return await axios.post(API_URL, student);
}

export async function getStudents() {
  return await axios.get(API_URL);
}

export async function getStudent(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateStudent(student) {
  return await axios.post(API_URL, student);
}

export async function deleteStudent(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
