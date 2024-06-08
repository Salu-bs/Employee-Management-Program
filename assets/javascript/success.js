document.addEventListener("DOMContentLoaded", function() {
    // Select the popup element
    const successPopup = document.getElementById('success-popup');

    // Function to hide the popup after 3 seconds (3000 milliseconds)
    setTimeout(function() {
        successPopup.style.display = 'none';
    }, 2000); // Change the duration as needed
});
