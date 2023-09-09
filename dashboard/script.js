function Logout() {
    localStorage.removeItem("LoggedIn")
    // Redirect to the dashboard or home page after 2 seconds
    setTimeout(function () {
        window.location.href = "/index.html"; // Change the URL to your dashboard or home page
    }, 500); // Delay the redirection for 2 seconds
}

let username = JSON.parse(localStorage.getItem("LoggedIn"))
username = username[0].username
document.getElementById("user").innerText = `Welcome ${username.toUpperCase()} !`