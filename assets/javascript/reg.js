// document.addEventListener("DOMContentLoaded", function() {
//     // Function to show the success popup with animation
//     function showSuccessPopup() {
//         const popup = document.getElementById('success-popup');
//         popup.classList.add('fade-in');
        
//         // Remove the fade-in class after the animation completes to allow re-triggering
//         popup.addEventListener('animationend', () => {
//             popup.classList.remove('fade-in');
//         }, { once: true });
//     }

//     // Example of showing the popup after a certain event, e.g., page load or form submission
//     showSuccessPopup();
// });
setTimeout(() => {
    window.location.href = "/"; // Replace with the URL you want to redirect to
}, 3000);