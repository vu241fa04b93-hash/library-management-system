import axios from "https://cdn.jsdelivr.net/npm/axios/+esm";

import API_BASE_URL from "./apiConfig.js";

import {
    handleApiError
} from "../../exception/apiException.js";


const USERS_URL = `${API_BASE_URL}/users`;


/* =========================
   Get All Users
   ========================= */

export async function getUsers() {

    try {

        const response =
            await axios.get(USERS_URL);

        return response.data;

    } catch (error) {

        throw new Error(
            handleApiError(error)
        );
    }
}


/* =========================
   Get User By ID
   ========================= */

export async function getUserById(id) {

    try {

        const response =
            await axios.get(
                `${USERS_URL}/${id}`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            handleApiError(error)
        );
    }
}


/* =========================
   Add User
   ========================= */

export async function addUser(user) {

    try {

        const response =
            await axios.post(
                USERS_URL,
                user
            );

        return response.data;

    } catch (error) {

        throw new Error(
            handleApiError(error)
        );
    }
}


/* =========================
   Update User
   ========================= */

export async function updateUser(id, user) {

    try {

        const response =
            await axios.put(
                `${USERS_URL}/${id}`,
                user
            );

        return response.data;

    } catch (error) {

        throw new Error(
            handleApiError(error)
        );
    }
}


/* =========================
   Delete User
   ========================= */

export async function deleteUser(id) {

    try {

        const response =
            await axios.delete(
                `${USERS_URL}/${id}`
            );

        return response.data;

    } catch (error) {

        throw new Error(
            handleApiError(error)
        );
    }
}