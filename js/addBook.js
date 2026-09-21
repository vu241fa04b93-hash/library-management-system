import {
    addBook
} from "./service/bookService.js";

import {
    validateBook
} from "../exception/validationException.js";


const form =
    document.getElementById(
        "addBookForm"
    );


form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const book = {

            title:
                document.getElementById(
                    "title"
                ).value.trim(),

            author:
                document.getElementById(
                    "author"
                ).value.trim(),

            category:
                document.getElementById(
                    "category"
                ).value.trim(),

            price:
                Number(
                    document.getElementById(
                        "price"
                    ).value
                ),

            totalStock:
                Number(
                    document.getElementById(
                        "totalStock"
                    ).value
                ),

            availableStock:
                Number(
                    document.getElementById(
                        "totalStock"
                    ).value
                )
        };


        clearErrors();


        const errors =
            validateBook(book);


        displayErrors(errors);


        if (Object.keys(errors).length > 0) {
            return;
        }


        try {

            await addBook(book);


            alert(
                "Book added successfully!"
            );


            window.location.href =
                "index.html";

        } catch (error) {

            alert(error.message);
        }
    }
);


function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";
        });
}


function displayErrors(errors) {

    Object.keys(errors)
        .forEach(field => {

            const errorElement =
                document.getElementById(
                    `${field}Error`
                );


            if (errorElement) {

                errorElement.textContent =
                    errors[field];
            }
        });
}