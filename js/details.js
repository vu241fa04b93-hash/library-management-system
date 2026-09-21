import {
    getBookById
} from "./service/bookService.js";


const bookDetails =
    document.getElementById("bookDetails");


const params =
    new URLSearchParams(
        window.location.search
    );


const bookId =
    params.get("id");


async function loadBookDetails() {

    if (!bookId) {

        bookDetails.innerHTML = `
            <p class="error">
                Book ID not found.
            </p>
        `;

        return;
    }


    try {

        const book =
            await getBookById(bookId);


        const totalStock =
            Number(book.totalStock);


        const availableStock =
            Number(book.availableStock);


        const issuedStock =
            totalStock - availableStock;


        const status =
            availableStock > 0
                ? "Available"
                : "Out of Stock";


        const statusClass =
            availableStock > 0
                ? "available"
                : "issued";


        bookDetails.innerHTML = `

            <div class="details-card">

                <h2>
                    ${book.title}
                </h2>


                <p>
                    <strong>Book ID:</strong>
                    ${book.id}
                </p>


                <p>
                    <strong>Author:</strong>
                    ${book.author}
                </p>


                <p>
                    <strong>Category:</strong>
                    ${book.category}
                </p>


                <p>
                    <strong>Price:</strong>
                    ₹${book.price}
                </p>


                <p>
                    <strong>Total Stock:</strong>
                    ${totalStock}
                </p>


                <p>
                    <strong>Available Copies:</strong>
                    ${availableStock}
                </p>


                <p>
                    <strong>Issued Copies:</strong>
                    ${issuedStock}
                </p>


                <p>
                    <strong>Status:</strong>

                    <span class="${statusClass}">
                        ${status}
                    </span>
                </p>

            </div>

        `;

    } catch (error) {

        bookDetails.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;
    }
}


loadBookDetails();