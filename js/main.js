import {
    getBooks,
    deleteBook
} from "./service/bookService.js";


const booksContainer =
    document.getElementById("booksContainer");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const allBooksButton =
    document.getElementById("allBooksButton");

const availableBooksButton =
    document.getElementById("availableBooksButton");

const issuedBooksButton =
    document.getElementById("issuedBooksButton");


let allBooks = [];

let currentStatus = "all";


// =========================
// Load Books
// =========================

async function loadBooks() {

    try {

        allBooks = await getBooks();

        createCategoryOptions();

        applyFilters();

    } catch (error) {

        booksContainer.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;

    }

}


// =========================
// Category Options
// =========================

function createCategoryOptions() {

    const categories = [
        ...new Set(
            allBooks.map(
                book => book.category
            )
        )
    ];


    categories.sort();


    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value =
            category;


        option.textContent =
            category;


        categoryFilter.appendChild(
            option
        );

    });

}


// =========================
// Apply Filters
// =========================

function applyFilters() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const filteredBooks =
        allBooks.filter(book => {


            // Search
            const matchesSearch =

                book.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                book.author
                    .toLowerCase()
                    .includes(searchText);


            // Category
            const matchesCategory =

                selectedCategory === "all"

                ||

                book.category ===
                selectedCategory;


            // Status
            const matchesStatus =

                currentStatus === "all"

                ||

                (
                    currentStatus === "Available"
                    &&
                    Number(
                        book.availableStock
                    ) > 0
                )

                ||

                (
                    currentStatus === "Issued"
                    &&
                    Number(
                        book.availableStock
                    ) <
                    Number(
                        book.totalStock
                    )
                );


            return (

                matchesSearch

                &&

                matchesCategory

                &&

                matchesStatus

            );

        });


    displayBooks(
        filteredBooks
    );

}


// =========================
// Display Books
// =========================

function displayBooks(books) {

    booksContainer.innerHTML = "";


    if (books.length === 0) {

        booksContainer.innerHTML = `
            <p class="no-books">
                No books found.
            </p>
        `;

        return;

    }


    books.forEach(book => {


        const bookCard =
            document.createElement(
                "div"
            );


        bookCard.classList.add(
            "book-card"
        );


        const isAvailable =
            Number(
                book.availableStock
            ) > 0;


        const hasIssuedCopies =
            Number(
                book.availableStock
            ) <
            Number(
                book.totalStock
            );


        const statusText =

            isAvailable
                ? "Available"
                : "Out of Stock";


        const statusClass =

            isAvailable
                ? "available"
                : "issued";


        bookCard.innerHTML = `

            <h3>
                ${book.title}
            </h3>


            <p>
                <strong>
                    Author:
                </strong>

                ${book.author}
            </p>


            <p>
                <strong>
                    Category:
                </strong>

                ${book.category}
            </p>


            <p>
                <strong>
                    Price:
                </strong>

                ₹${book.price}
            </p>


            <p>
                <strong>
                    Total Stock:
                </strong>

                ${book.totalStock}
            </p>


            <p>
                <strong>
                    Available:
                </strong>

                ${book.availableStock}
            </p>


            <p class="${statusClass}">
                ${statusText}
            </p>


            <div class="book-actions">


                <!-- Details -->

                <a
                    href="details.html?id=${book.id}"
                    class="details-button"
                >
                    View Details
                </a>


                <!-- Edit -->

                <a
                    href="edit-book.html?id=${book.id}"
                    class="edit-button"
                >
                    Edit
                </a>


                <!-- Delete -->

                <button
                    class="delete-button"
                    data-id="${book.id}"
                >
                    Delete
                </button>


                <!-- Issue -->

                ${
                    isAvailable

                    ?

                    `
                        <a
                            href="issue-book.html?bookId=${book.id}"
                            class="issue-button"
                        >
                            Issue
                        </a>
                    `

                    :

                    ""
                }


                <!-- Return -->

                ${
                    hasIssuedCopies

                    ?

                    `
                        <a
                            href="return-book.html?bookId=${book.id}"
                            class="return-button"
                        >
                            Return
                        </a>
                    `

                    :

                    ""
                }


            </div>

        `;


        booksContainer.appendChild(
            bookCard
        );

    });


    addDeleteEvents();

}


// =========================
// Delete Book
// =========================

function addDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-button"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                async function () {


                    const id =
                        this.dataset.id;


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete this book?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    try {


                        await deleteBook(
                            id
                        );


                        alert(
                            "Book deleted successfully!"
                        );


                        await loadBooks();


                    } catch (error) {


                        alert(
                            error.message
                        );

                    }

                }
            );

        });

}


// =========================
// Search
// =========================

searchInput.addEventListener(
    "input",
    applyFilters
);


// =========================
// Category Filter
// =========================

categoryFilter.addEventListener(
    "change",
    applyFilters
);


// =========================
// All Books
// =========================

allBooksButton.addEventListener(
    "click",
    () => {


        currentStatus =
            "all";


        setActiveButton(
            allBooksButton
        );


        applyFilters();

    }
);


// =========================
// Available Books
// =========================

availableBooksButton.addEventListener(
    "click",
    () => {


        currentStatus =
            "Available";


        setActiveButton(
            availableBooksButton
        );


        applyFilters();

    }
);


// =========================
// Issued Books
// =========================

issuedBooksButton.addEventListener(
    "click",
    () => {


        currentStatus =
            "Issued";


        setActiveButton(
            issuedBooksButton
        );


        applyFilters();

    }
);


// =========================
// Active Filter Button
// =========================

function setActiveButton(
    activeButton
) {


    document
        .querySelectorAll(
            ".filter-button"
        )
        .forEach(button => {


            button.classList.remove(
                "active"
            );

        });


    activeButton.classList.add(
        "active"
    );

}


// =========================
// Start Application
// =========================

loadBooks();