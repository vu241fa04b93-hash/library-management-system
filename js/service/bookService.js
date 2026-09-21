import axios from "https://cdn.jsdelivr.net/npm/axios/+esm";

import API_BASE_URL from "./apiConfig.js";

import {
    handleApiError
} from "../../exception/apiException.js";


const BOOKS_URL = `${API_BASE_URL}/books`;


export async function getBooks() {

    try {

        const response = await axios.get(BOOKS_URL);

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function getBookById(id) {

    try {

        const response = await axios.get(`${BOOKS_URL}/${id}`);

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function addBook(book) {

    try {

        const response = await axios.post(
            BOOKS_URL,
            book
        );

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function updateBook(id, book) {

    try {

        const response = await axios.put(
            `${BOOKS_URL}/${id}`,
            book
        );

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function deleteBook(id) {

    try {

        const response = await axios.delete(
            `${BOOKS_URL}/${id}`
        );

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}