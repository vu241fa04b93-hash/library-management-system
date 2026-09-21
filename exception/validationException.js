export function validateBook(book) {

    const errors = {};


    if (!book.title || book.title.trim() === "") {

        errors.title =
            "Title is required.";
    }


    if (!book.author || book.author.trim() === "") {

        errors.author =
            "Author is required.";
    }


    if (!book.category || book.category.trim() === "") {

        errors.category =
            "Category is required.";
    }


    if (
        book.price === "" ||
        book.price === null ||
        book.price === undefined ||
        Number(book.price) <= 0
    ) {

        errors.price =
            "Price must be greater than 0.";
    }


    if (
        book.totalStock === "" ||
        book.totalStock === null ||
        book.totalStock === undefined ||
        Number(book.totalStock) <= 0 ||
        !Number.isInteger(
            Number(book.totalStock)
        )
    ) {

        errors.totalStock =
            "Total stock must be a positive whole number.";
    }


    if (
        book.availableStock === "" ||
        book.availableStock === null ||
        book.availableStock === undefined ||
        Number(book.availableStock) < 0 ||
        Number(book.availableStock) >
        Number(book.totalStock)
    ) {

        errors.availableStock =
            "Available stock must be between 0 and total stock.";
    }


    return errors;
}


/* =========================
   User Validation
   ========================= */

export function validateUser(user) {

    const errors = {};


    if (
        !user.name ||
        user.name.trim() === ""
    ) {

        errors.name =
            "Name is required.";
    }


    if (
        !user.email ||
        user.email.trim() === ""
    ) {

        errors.email =
            "Email is required.";

    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(user.email)
    ) {

        errors.email =
            "Enter a valid email address.";
    }


    if (
        !user.phone ||
        user.phone.trim() === ""
    ) {

        errors.phone =
            "Phone number is required.";

    } else if (
        !/^[0-9]{10}$/.test(user.phone)
    ) {

        errors.phone =
            "Phone number must contain 10 digits.";
    }


    return errors;
}