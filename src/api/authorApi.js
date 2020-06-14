import {handleResponse, handleError} from "./apiUtils";
//const baseUrl = process.env.REACT_APP_API_URL + "/authors/";
const baseUrl = "http://localhost:3001" + "/authors/";
export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveAuthor(author) {
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {"content-type": "application/json"},
    body: JSON.stringify(author),
  })
    .then(handleResponse)
    .catch(handleError);
}

//thunk is a function  that wraps an expression to delay its evaluation
export function deleteAuthor(authorId) {
  return fetch(baseUrl + authorId, {method: "DELETE"})
    .then(handleResponse)
    .catch(handleError);
}
