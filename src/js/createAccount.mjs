export default function setupSignupForm() {
    const createAccount = document.querySelector("#createAccount");

    createAccount.addEventListener("submit", function(event) {
        event.preventDefault();
        const user = {
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            email: document.getElementById("accountEmail").value
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        console.log("User created: ", user)

        createAccount.innerHTML = `<h2>Congrats! Your account has been created!</h2>
        <p>Name: ${user.name}</p>
        <p>Address: ${user.address}</p>
        <p>Email: ${user.email}</p>`;

    })
}