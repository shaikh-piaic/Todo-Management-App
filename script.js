function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Retrieve users from local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var loggedUser = JSON.parse(localStorage.getItem("LoggedIn")) || [];
    // Find user by email
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) {
        // User not found, display error message
        displayError("emailError", "Email not found. Please sign up.");
        return false; // Prevent form submission
    }

    // Check password
    if (user.password !== password) {
        // Password does not match, display error message
        displayError("passwordError", "Incorrect password.");
        return false; // Prevent form submission
    }

    // LoggedIn User Detail
    var userData = {
        email: email,
        username: user.username,
        password: password
    };
    loggedUser.push(userData);
    localStorage.setItem("LoggedIn", JSON.stringify(loggedUser));
    // Login successful, display success message
    displaySuccess("Login successful!");

    // Redirect to the dashboard or home page after 2 seconds
    setTimeout(function () {
        window.location.href = "/dashboard/index.html"; // Change the URL to your dashboard or home page
    }, 2000); // Delay the redirection for 2 seconds

    return false; // Prevent form submission (for demonstration purposes)
}

function displayError(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.classList.add("d-block");
}

// function displaySuccess(message) {
//     var alertMessage = document.getElementById("alertMessage");
//     alertMessage.textContent = message;
//     alertMessage.classList.remove("alert-danger", "d-none");
//     alertMessage.classList.add("alert-success", "d-block");
// }
function displaySuccess(message) {
    swal(message, "Hurray!!", "success");
}