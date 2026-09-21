import {
    getBooks,
    getBookById,
    updateBook
} from "./service/bookService.js";

import {
    getUsers
} from "./service/userService.js";

import {
    getIssuedBooks,
    returnBook
} from "./service/issuedBookService.js";


const form =
    document.getElementById("returnBookForm");

const bookSelect =
    document.getElementById("bookSelect");

const userSelect =
    document.getElementById("userSelect");

const bookError =
    document.getElementById("bookError");

const userError =
    document.getElementById("userError");

const issueInfo =
    document.getElementById("issueInfo");


let books = [];

let users = [];

let issuedBooks = [];


// ===============================
// Get Book ID from URL
// ===============================

const params =
    new URLSearchParams(window.location.search);

const selectedBookId =
    params.get("bookId");


// ===============================
// Load Data
// ===============================

async function loadData() {

    try {

        books = await getBooks();

        users = await getUsers();

        issuedBooks = await getIssuedBooks();


        // Load only books that have issued copies
        const issuedBookIds =
            [
                ...new Set(
                    issuedBooks.map(
                        record => String(record.bookId)
                    )
                )
            ];


        issuedBookIds.forEach(bookId => {

            const book =
                books.find(
                    book =>
                        String(book.id) ===
                        String(bookId)
                );


            if (!book) {
                return;
            }


            const option =
                document.createElement("option");

            option.value =
                book.id;

            option.textContent =
                `${book.title} — ${book.author}`;

            bookSelect.appendChild(option);

        });


        // Automatically select book
        if (selectedBookId) {

            bookSelect.value =
                selectedBookId;

            loadUsersForBook(
                selectedBookId
            );

        }


    } catch (error) {

        bookError.textContent =
            error.message;

    }

}


// ===============================
// Load Users for Selected Book
// ===============================

function loadUsersForBook(bookId) {

    userSelect.innerHTML = `
        <option value="">
            Select a user
        </option>
    `;

    issueInfo.innerHTML = "";


    if (!bookId) {
        return;
    }


    const records =
        issuedBooks.filter(
            record =>
                String(record.bookId) ===
                String(bookId)
        );


    records.forEach(record => {

        const user =
            users.find(
                user =>
                    String(user.id) ===
                    String(record.userId)
            );


        if (!user) {
            return;
        }


        const option =
            document.createElement("option");

        option.value =
            record.id;

        option.textContent =
            `${user.name} (ID: ${user.id})`;

        userSelect.appendChild(option);

    });


    if (records.length === 0) {

        userError.textContent =
            "No active issue records found for this book.";

    }

}


// ===============================
// Book Selection
// ===============================

bookSelect.addEventListener(
    "change",
    function () {

        bookError.textContent = "";
        userError.textContent = "";

        loadUsersForBook(
            this.value
        );

    }
);


// ===============================
// User Selection
// ===============================

userSelect.addEventListener(
    "change",
    function () {

        issueInfo.innerHTML = "";

        if (!this.value) {
            return;
        }


        const issuedRecord =
            issuedBooks.find(
                record =>
                    String(record.id) ===
                    String(this.value)
            );


        if (!issuedRecord) {
            return;
        }


        issueInfo.innerHTML = `
            <p class="stock-info">
                <strong>Issue Date:</strong>
                ${issuedRecord.issueDate}
            </p>
        `;

    }
);


// ===============================
// Return Book
// ===============================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        bookError.textContent = "";
        userError.textContent = "";


        const bookId =
            bookSelect.value;

        const issuedRecordId =
            userSelect.value;


        // Validate book
        if (!bookId) {

            bookError.textContent =
                "Please select a book.";

            return;
        }


        // Validate user
        if (!issuedRecordId) {

            userError.textContent =
                "Please select a user.";

            return;
        }


        try {

            // Get latest book data
            const book =
                await getBookById(bookId);


            // Find exact issued record
            const issuedRecord =
                issuedBooks.find(
                    record =>
                        String(record.id) ===
                        String(issuedRecordId)
                );


            if (!issuedRecord) {

                userError.textContent =
                    "Issued record not found.";

                return;
            }


            // Delete exact issued record
            await returnBook(
                issuedRecord.id
            );


            // Increase available stock
            const updatedBook = {

                ...book,

                availableStock:
                    Math.min(
                        Number(book.availableStock) + 1,

                        Number(book.totalStock)
                    )

            };


            await updateBook(
                book.id,
                updatedBook
            );


            alert(
                `"${book.title}" returned successfully!`
            );


            // Go back to Books
            window.location.href =
                "index.html";


        } catch (error) {

            alert(error.message);

        }

    }
);


// ===============================
// Start Page
// ===============================

loadData();