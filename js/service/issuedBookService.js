import axios from "https://cdn.jsdelivr.net/npm/axios/+esm";

import API_BASE_URL from "./apiConfig.js";

import {
    handleApiError
} from "../../exception/apiException.js";


const ISSUED_BOOKS_URL =
    `${API_BASE_URL}/issuedBooks`;


export async function getIssuedBooks() {

    try {

        const response =
            await axios.get(ISSUED_BOOKS_URL);

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function issueBook(issueData) {

    try {

        const response =
            await axios.post(
                ISSUED_BOOKS_URL,
                issueData
            );

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}


export async function returnBook(issuedBookId) {

    try {

        const response =
            await axios.delete(
                `${ISSUED_BOOKS_URL}/${issuedBookId}`
            );

        return response.data;

    } catch (error) {

        throw new Error(handleApiError(error));
    }
}