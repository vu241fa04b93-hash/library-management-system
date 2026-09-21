import { addUser, getUsers } from "./service/userService.js";
import { validateUser } from "../exception/validationException.js";

const form = document.getElementById("addUserForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");


function generateUserId(users) {

    let maxId = 0;

    for (const user of users) {

        const numericId = parseInt(user.id, 10);

        if (!isNaN(numericId) && numericId > maxId) {
            maxId = numericId;
        }
    }

    return String(maxId + 1);
}


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Clear old errors
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";


    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };


    // Validate
    const errors = validateUser(user);

    if (Object.keys(errors).length > 0) {

        nameError.textContent = errors.name || "";
        emailError.textContent = errors.email || "";
        phoneError.textContent = errors.phone || "";

        return;
    }


    try {

        // Get all existing users
        const users = await getUsers();


        // Check duplicate email
        const emailExists = users.some(
            existingUser =>
                String(existingUser.email).toLowerCase() ===
                user.email.toLowerCase()
        );

        if (emailExists) {

            emailError.textContent =
                "A user with this email already exists.";

            return;
        }


        // Generate numeric ID
        const newId = generateUserId(users);

        user.id = newId;


        // Add user
        await addUser(user);


        alert(
            "User added successfully!\n\nUser ID: " + newId
        );


        // Return to users page
        window.location.href = "users.html";

    } catch (error) {

        alert(error.message);

    }

});