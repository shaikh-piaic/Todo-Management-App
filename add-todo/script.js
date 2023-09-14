function validateForm() {
    var loggedUser = JSON.parse(localStorage.getItem("LoggedIn"))
    var userTodo = JSON.parse(localStorage.getItem("Todo")) || []
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var priority = document.getElementById("priority").value;
    var tid = 2000;
    var uuid = loggedUser.uid

    // Validate title length
    if (title === "") {
        displayError("titleError", "Required")
        return false; // Prevent form submission
    }
    if (priority === "") {
        displayError("priorityError", "Required")
        return false; // Prevent form submission
    }
    var todoID = userTodo[userTodo?.length - 1]?.id

    if (todoID != null) {
        todoID = ++todoID
    } else {
        todoID = tid
    }
    // Save user data to local storage
    var TodoData = {
        id: todoID,
        uid: uuid,
        title: title,
        desc: desc,
        priority: priority,
        createdOn: Date(Date.now()).toString(),
        status: false
    };
    userTodo.push(TodoData);
    localStorage.setItem("Todo", JSON.stringify(userTodo));

    // Display success message
    displaySuccess("Todo Successfully Added!");

    // Reset the form fields
    document.getElementById("signupForm").reset();

    // Redirect to the login page after 2 seconds
    setTimeout(function () {
        window.location.href = "/dashboard/index.html"; // Change the URL to your login page
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
