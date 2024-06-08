document.addEventListener('DOMContentLoaded', function () {
    // Function to handle input change
    function handleInputChange(event) {
        const input = event.target;
        const inputValue = input.value;
        const numericInputValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters

        // Update input value to contain only numbers
        if (numericInputValue !== inputValue) {
            input.value = numericInputValue;
        }

        // Only allow one character in the input box
        if (input.value.length > 1) {
            input.value = input.value.charAt(0);
        }

        // Focus on the next input box if it exists
        if (numericInputValue.length === 1) {
            const nextInput = input.nextElementSibling;
            if (nextInput && nextInput.classList.contains('otp-letter-input')) {
                nextInput.focus();
            }
        }
    }

    // Function to handle backspace key
    function handleBackspace(event) {
        const input = event.target;
        if (event.key === 'Backspace' && input.value === '') {
            const previousInput = input.previousElementSibling;
            if (previousInput && previousInput.classList.contains('otp-letter-input')) {
                previousInput.focus();
            }
        }
    }

    // Add event listeners to each OTP input box
    document.querySelectorAll('.otp-letter-input').forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('keydown', handleBackspace);
    });

    // Function to handle verification button click
    document.querySelector('.btns-success').addEventListener('click', function() {
        const otpInputs = document.querySelectorAll('.otp-letter-input');
        let otp = '';
        otpInputs.forEach(input => {
            otp += input.value;
        });
        // You can now use the `otp` value for verification
        console.log('OTP:', otp);
    });

    // Function to handle resend link click
    document.querySelector('.text-success').addEventListener('click', function(event) {
        event.preventDefault();
        alert('OTP resent successfully!');
    });

    // Function to handle cancel button click (optional)
    document.querySelector('.btns-outline-secondary').addEventListener('click', function() {
        // Add code to handle cancel button click if needed
        alert('OTP verification cancelled');
    });

    // Retrieve email from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    // Populate email placeholder
    document.getElementById('email-placeholder').innerText = email;
});
