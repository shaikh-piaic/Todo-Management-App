function validateForm() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var uuid = 1000;

    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        displayError("emailError", "Please enter a valid email address.");
        return false; // Prevent form submission
    }

    // Validate username length
    if (!isValidUsername(username)) {
        return false; // Prevent form submission
    }


    // Check if the email or username already exists in local storage
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userExists = users.some(function (user) {
        return user.email === email || user.username === username;
    });

    if (userExists) {
        displayError("emailError", "Email or username is already registered.");
        return false; // Prevent form submission
    }

    // Validate password length
    if (password.length < 6 || password.length > 20) {
        displayError("passwordError", "Password must be between 6 and 20 characters.");
        return false; // Prevent form submission
    }

    var userID = users[users?.length - 1]?.uid

    if (userID != null) {
        userID = ++userID
    } else {
        userID = uuid
    }

    // Save user data to local storage
    var userData = {
        uid: userID,
        email: email,
        username: username,
        password: password
    };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    // Display success message
    displaySuccess("Successfully signed up!");

    // Reset the form fields
    document.getElementById("signupForm").reset();

    // Redirect to the login page after 2 seconds
    setTimeout(function () {
        window.location.href = "/index.html"; // Change the URL to your login page
    }, 500); // Delay the redirection for 2 seconds

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

function isValidUsername(username) {
    // Check if username contains numbers or special characters
    var usernamePattern = /^[a-zA-Z]+$/;
    if (!username.match(usernamePattern)) {
        displayError("usernameError", "Username should only contain letters.");
        return false;
    }

    // Check if username length is between 4 and 15 characters
    if (username.length < 4 || username.length > 15) {
        displayError("usernameError", "Username must be between 4 and 15 characters.");
        return false;
    }

    return true; // Username is valid
}