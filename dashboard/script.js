let user = JSON.parse(localStorage.getItem("LoggedIn"))
let todos = JSON.parse(localStorage.getItem("Todo"))
let userTodo = todos?.filter((todo) => todo.uid === user.uid)
document.getElementById("user").innerText = `Welcome ${user.username.toUpperCase()} !`

function Logout() {
    localStorage.removeItem("LoggedIn")
    // Redirect to the dashboard or home page after 2 seconds
    setTimeout(function () {
        window.location.href = "/index.html"; // Change the URL to your dashboard or home page
    }, 500); // Delay the redirection for 2 seconds
}

function Done(id) {
    let todoIndex = userTodo.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        userTodo[todoIndex].status = !userTodo[todoIndex].status;
        localStorage.setItem("Todo", JSON.stringify(todos));
        // Update the table row's class based on the new status
        let itemRow = document.getElementById(`items-${id}`);
        console.log(itemRow)
        if (userTodo[todoIndex].status) {
            itemRow.classList.add("text-decoration-line-through");
        } else {
            itemRow.classList.remove("text-decoration-line-through");
        }

    }
}
function Delete(id) {
    let filteredTodos = userTodo.filter((todo) => todo.id !== id)
    localStorage.setItem("Todo", JSON.stringify(filteredTodos))
    setTimeout(function () {
        location.reload()
    }, 1500);
}
function DeleteAll() {
    let filteredTodos = todos.filter((todo) => todo.uid !== user.uid)
    console.log(filteredTodos)
    localStorage.setItem("Todo", JSON.stringify(filteredTodos))
    // setTimeout(function () {
    //     location.reload()
    // }, 1500);
}

let tble = document.getElementById("tb")
if (userTodo.length > 0) {

    const tableData = todos.map(value => {
        if (user.uid === value.uid) {
            let date = new Date(value.createdOn)
            let strike = value.status ? "text-decoration-line-through" : "text-decoration-none"
            return (
                `<tr id="items-${value.id}" class="${strike}">
             <td>${value.id}</td>
             <td>${value.title}</td>
             <td>${value.desc === "" ? "-" : value.desc}</td>
             <td>${value.priority}</td>
             <td>${date.toDateString()}</td>
             <td><div class="form-check form-switch ">
                <input class="form-check-input" type="checkbox" role="switch" onclick="Done(${value.id})" ${value.status ? "checked" : ""} />
              </div></td>
             <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                  <button type="button" class="btn btn-danger"onclick="Display(${value.id})">Delete</button>
                </div>
              </td>
          </tr>`
            );
        }
    }).join('');
    tble.innerHTML = tableData
}
function Display(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this item!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your todo has been deleted!", {
                    icon: "success",
                });
                Delete(id)
            } else {
                swal("Your todo is safe!");
            }
        });
}
function Deleted() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover all the todos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your todos has been deleted!", {
                    icon: "success",
                });
                DeleteAll()
            } else {
                swal("Your todos are safe!");
            }
        });
}