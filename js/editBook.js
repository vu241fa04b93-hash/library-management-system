import {
    getBookById,
    updateBook
} from "./service/bookService.js";

import {
    validateBook
} from "../exception/validationException.js";


const params =
    new URLSearchParams(
        window.location.search
    );


const bookId =
    params.get("id");


const form =
    document.getElementById(
        "editBookForm"
    );


let existingBook = null;


/* =========================
   Load Existing Book
   ========================= */

async function loadBook() {

    if (!bookId) {

        alert(
            "Book ID not found."
        );

        return;
    }


    try {

        existingBook =
            await getBookById(bookId);


        document.getElementById(
            "title"
        ).value =
            existingBook.title;


        document.getElementById(
            "author"
        ).value =
            existingBook.author;


        document.getElementById(
            "category"
        ).value =
            existingBook.category;


        document.getElementById(
            "price"
        ).value =
            existingBook.price;


        document.getElementById(
            "totalStock"
        ).value =
            existingBook.totalStock;


        document.getElementById(
            "availableStock"
        ).value =
            existingBook.availableStock;


    } catch (error) {

        alert(error.message);
    }
}


/* =========================
   Update Book
   ========================= */

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
                        "availableStock"
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


        /*
         Make sure stock isn't
         lower than already issued copies.
        */

        const issuedCopies =
            Number(
                existingBook.totalStock
            )
            -
            Number(
                existingBook.availableStock
            );


        if (
            book.totalStock <
            issuedCopies
        ) {

            alert(
                `Total stock cannot be less than the ${issuedCopies} copies currently issued.`
            );

            return;
        }


        /*
         Available stock cannot be
         greater than total stock.
        */

        if (
            book.availableStock >
            book.totalStock
        ) {

            alert(
                "Available stock cannot be greater than total stock."
            );

            return;
        }


        try {

            await updateBook(
                bookId,
                {
                    id: existingBook.id,

                    title: book.title,

                    author: book.author,

                    category: book.category,

                    price: book.price,

                    totalStock:
                        book.totalStock,

                    availableStock:
                        book.availableStock
                }
            );


            alert(
                "Book updated successfully!"
            );


            window.location.href =
                "index.html";


        } catch (error) {

            alert(error.message);
        }
    }
);


/* =========================
   Error Handling
   ========================= */

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


/* Start */

loadBook();