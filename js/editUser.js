import {
    getUserById,
    getUsers,
    updateUser
} from "./service/userService.js";


import {
    validateUser
} from "../exception/validationException.js";


const params =
    new URLSearchParams(
        window.location.search
    );


const userId =
    params.get("id");


const form =
    document.getElementById(
        "editUserForm"
    );


let existingUser = null;


/* =========================
   Load User
   ========================= */

async function loadUser() {

    if (!userId) {

        alert(
            "User ID not found."
        );

        return;
    }


    try {

        existingUser =
            await getUserById(
                userId
            );


        document.getElementById(
            "userId"
        ).value =
            existingUser.id;


        document.getElementById(
            "name"
        ).value =
            existingUser.name;


        document.getElementById(
            "email"
        ).value =
            existingUser.email;


        document.getElementById(
            "phone"
        ).value =
            existingUser.phone;

    } catch (error) {

        alert(
            error.message
        );
    }
}


/* =========================
   Update User
   ========================= */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const user = {

            name:
                document.getElementById(
                    "name"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            phone:
                document.getElementById(
                    "phone"
                ).value.trim()
        };


        clearErrors();


        const errors =
            validateUser(user);


        displayErrors(
            errors
        );


        if (
            Object.keys(errors).length > 0
        ) {

            return;
        }


        try {

            const users =
                await getUsers();


            const duplicate =
                users.some(
                    existing =>
                        existing.id !== userId
                        &&
                        existing.email
                            .toLowerCase()
                        ===
                        user.email
                            .toLowerCase()
                );


            if (duplicate) {

                document.getElementById(
                    "emailError"
                ).textContent =
                    "This email is already registered.";

                return;
            }


            await updateUser(
                userId,
                {
                    id:
                        existingUser.id,

                    name:
                        user.name,

                    email:
                        user.email,

                    phone:
                        user.phone
                }
            );


            alert(
                "User updated successfully!"
            );


            window.location.href =
                "users.html";

        } catch (error) {

            alert(
                error.message
            );
        }
    }
);


/* =========================
   Clear Errors
   ========================= */

function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";
        });
}


/* =========================
   Display Errors
   ========================= */

function displayErrors(errors) {

    Object.keys(errors)
        .forEach(field => {

            const element =
                document.getElementById(
                    `${field}Error`
                );


            if (element) {

                element.textContent =
                    errors[field];
            }
        });
}


/* Start */

loadUser();