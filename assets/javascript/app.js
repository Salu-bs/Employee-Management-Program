const sign_in_btn = document.querySelector("#signinbtn");
const sign_up_btn = document.querySelector("#signupbtn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#signinbtn2");
const sign_up_btn2 = document.querySelector("#signupbtn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign_up_mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign_up_mode");
});

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const email = event.target.email.value;
//     const password = event.target.password.value;

//     fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Handle the response from the server
//         console.log(data);
//         if (data.token) {
//             console.log(data.token); // Check if the token is present
//             // Store the token in localStorage or cookie if needed
//             localStorage.setItem('token', data.token);
//             // Redirect to the home page
//             window.location.href = 'http://localhost:3000/home';
//         } else {
//             // Handle the error case, e.g., show a message
//             console.error('Login failed:', data.message);
//             alert(data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Handle the error
//         alert('An error occurred. Please try again.');
//     });
// });

// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const email = event.target.email.value;
//     const password = event.target.password.value;

//     // Clear previous error messages
//     document.getElementById('emailError').textContent = '';
//     document.getElementById('passwordError').textContent = '';

//     fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())

//     .then(data => {
//         // Handle the response from the server
//         console.log(data.message);
//         if (data) {
//             console.log(data.message);
//              // Check if the token is present
//             // Store the token in localStorage or cookie if needed
//   localStorage.setItem('token', data.token);
//                 console.log(data.message);            
//             // Redirect to the home page
//             // window.location.href = 'http://localhost:3000/home';
//             Swal.fire({
//                 position: "top-center",
//                 icon: "success",
//                 title: "Login succcessfully",
//                 showConfirmButton: false,
//                 timer: 15000
//               });
//               setTimeout(() => {
//                   if(data){
//                     // window.location.href = 'http://localhost:3000/home';
//                   }
//               }, 2200);
//         } else {
//             // Handle the error case
//             if (data.message.includes('Invalid email')) {
//                 document.getElementById('emailError').textContent = data.message;
//                 console.log(data.message);

//             } else if (data.message.includes('Invalid password')) {
//                 document.getElementById('passwordError').textContent = data.message;
//             } else {
//                 // If both errors, show a popup
//                 alert(data.message);
//             }
//             console.error('Login failed:', data.message);
//             console.log(data.message);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Handle the error
//         alert('An error occurred. Please try again.');
//     });
// });

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Clear previous messages
    const errorMessageDiv = document.getElementById('error-message');
    const successMessageDiv = document.getElementById('success-message');
    errorMessageDiv.textContent = '';
    errorMessageDiv.style.display = 'none';
    successMessageDiv.textContent = '';
    successMessageDiv.style.display = 'none';

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data.token) {
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                console.log(data.message);

                // Display success message
                successMessageDiv.textContent = data.message || 'Login successful';
                successMessageDiv.style.display = 'block';

                // Redirect to another page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/home';
                }, 1000);
            } else {
                // Display error messages
                errorMessageDiv.textContent = data.message;
                errorMessageDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessageDiv.textContent = 'An error occurred. Please try again.';
            errorMessageDiv.style.display = 'block';
        });
});
