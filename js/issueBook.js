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
    issueBook
} from "./service/issuedBookService.js";


const form =
    document.getElementById("issueBookForm");

const bookSelect =
    document.getElementById("bookSelect");

const userSelect =
    document.getElementById("userSelect");

const bookError =
    document.getElementById("bookError");

const userError =
    document.getElementById("userError");

const stockInfo =
    document.getElementById("stockInfo");


let books = [];


// ===============================
// Get Book ID from URL
// ===============================

const params =
    new URLSearchParams(window.location.search);

const selectedBookId =
    params.get("bookId");


// ===============================
// Load Books
// ===============================

async function loadBooks() {

    try {

        books = await getBooks();

        const availableBooks =
            books.filter(
                book =>
                    Number(book.availableStock) > 0
            );


        availableBooks.forEach(book => {

            const option =
                document.createElement("option");

            option.value = book.id;

            option.textContent =
                `${book.title} — ${book.author}`;

            bookSelect.appendChild(option);

        });


        // Automatically select clicked book
        if (selectedBookId) {

            const bookExists =
                availableBooks.some(
                    book =>
                        String(book.id) ===
                        String(selectedBookId)
                );


            if (bookExists) {

                bookSelect.value =
                    selectedBookId;

                showStockInfo(selectedBookId);

            }

        }


    } catch (error) {

        bookError.textContent =
            error.message;

    }
}


// ===============================
// Load Users
// ===============================

async function loadUsers() {

    try {

        const users =
            await getUsers();


        users.forEach(user => {

            const option =
                document.createElement("option");

            option.value =
                user.id;

            option.textContent =
                `${user.name} (ID: ${user.id})`;

            userSelect.appendChild(option);

        });


    } catch (error) {

        userError.textContent =
            error.message;

    }
}


// ===============================
// Show Stock Information
// ===============================

function showStockInfo(bookId) {

    stockInfo.innerHTML = "";


    if (!bookId) {
        return;
    }


    const book =
        books.find(
            book =>
                String(book.id) ===
                String(bookId)
        );


    if (!book) {
        return;
    }


    const totalStock =
        Number(book.totalStock);

    const availableStock =
        Number(book.availableStock);

    const issuedStock =
        totalStock - availableStock;


    stockInfo.innerHTML = `
        <p class="stock-info">

            <strong>Total Stock:</strong>
            ${totalStock}

            <br>

            <strong>Available Copies:</strong>
            ${availableStock}

            <br>

            <strong>Issued Copies:</strong>
            ${issuedStock}

        </p>
    `;
}


// ===============================
// Book Selection
// ===============================

bookSelect.addEventListener(
    "change",
    function () {

        showStockInfo(this.value);

    }
);


// ===============================
// Issue Book
// ===============================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        bookError.textContent = "";
        userError.textContent = "";


        const bookId =
            bookSelect.value;

        const userId =
            userSelect.value;


        // Validate book
        if (!bookId) {

            bookError.textContent =
                "Please select a book.";

            return;
        }


        // Validate user
        if (!userId) {

            userError.textContent =
                "Please select a user.";

            return;
        }


        try {

            // Get latest book data
            const book =
                await getBookById(bookId);


            const availableStock =
                Number(book.availableStock);


            // Check stock
            if (availableStock <= 0) {

                bookError.textContent =
                    "This book is currently out of stock.";

                return;
            }


            // Get issued records
            const issuedBooks =
                await getIssuedBooks();


            // Prevent duplicate issue
            const alreadyIssued =
                issuedBooks.some(
                    record =>
                        String(record.bookId) ===
                        String(bookId)
                        &&
                        String(record.userId) ===
                        String(userId)
                );


            if (alreadyIssued) {

                userError.textContent =
                    "This user already has this book.";

                return;
            }


            // Create issued record
            const issueData = {

                bookId:
                    String(book.id),

                userId:
                    String(userId),

                issueDate:
                    new Date()
                        .toISOString()
                        .split("T")[0]

            };


            await issueBook(issueData);


            // Decrease available stock
            await updateBook(
                book.id,
                {
                    ...book,

                    availableStock:
                        availableStock - 1
                }
            );


            alert(
                `"${book.title}" issued successfully!`
            );


            // Return to Books page
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

loadBooks();

loadUsers();