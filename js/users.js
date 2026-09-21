import {
    getUsers,
    deleteUser
} from "./service/userService.js";


const usersContainer =
    document.getElementById(
        "usersContainer"
    );


const userSearch =
    document.getElementById(
        "userSearch"
    );


let allUsers = [];


/* =========================
   Load Users
   ========================= */

async function loadUsers() {

    try {

        allUsers =
            await getUsers();

        displayUsers(
            allUsers
        );

    } catch (error) {

        usersContainer.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;
    }
}


/* =========================
   Display Users
   ========================= */

function displayUsers(users) {

    usersContainer.innerHTML = "";


    if (users.length === 0) {

        usersContainer.innerHTML = `
            <p class="no-books">
                No users found.
            </p>
        `;

        return;
    }


    users.forEach(user => {

        const userCard =
            document.createElement("div");

        userCard.classList.add(
            "user-card"
        );


        userCard.innerHTML = `

            <div class="user-info">

                <h3>
                    ${user.name}
                </h3>

                <p>
                    <strong>User ID:</strong>
                    ${user.id}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${user.phone}
                </p>

            </div>


            <div class="user-actions">

                <a
                    href="edit-user.html?id=${user.id}"
                    class="edit-button"
                >
                    Edit
                </a>

                <button
                    class="delete-user-button"
                    data-id="${user.id}"
                >
                    Delete
                </button>

            </div>
        `;


        usersContainer.appendChild(
            userCard
        );
    });


    addDeleteEvents();
}


/* =========================
   Delete Users
   ========================= */

function addDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-user-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async function () {

                    const id =
                        this.dataset.id;


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete this user?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    try {

                        await deleteUser(id);


                        alert(
                            "User deleted successfully!"
                        );


                        await loadUsers();

                    } catch (error) {

                        alert(
                            error.message
                        );
                    }
                }
            );
        });
}


/* =========================
   Search Users
   ========================= */

userSearch.addEventListener(
    "input",
    () => {

        const searchText =
            userSearch.value
                .trim()
                .toLowerCase();


        const filteredUsers =
            allUsers.filter(user =>

                user.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                user.email
                    .toLowerCase()
                    .includes(searchText)

                ||

                user.id
                    .toLowerCase()
                    .includes(searchText)
            );


        displayUsers(
            filteredUsers
        );
    }
);


/* =========================
   Start
   ========================= */

loadUsers();