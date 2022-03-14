export const todoService = {
  query,
  save,
  removeTodo,
  getTodoById,
}

const URL = '/api/todo/'

function query() {
  return axios.get(URL).then((res) => res.data)
}

function save(todoToSave) {
  if (todoToSave._id) {
    return axios.put(URL, todoToSave).then((res) => res.data)
  } else {
    return axios.post(URL, todoToSave).then((res) => res.data)
  }
}

function removeTodo(id) {
  return axios.delete(URL + id)
}

function getTodoById(id) {
  return axios.get(URL + id).then((res) => res.data)
}
