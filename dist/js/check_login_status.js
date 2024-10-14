"use strict";
// Function to check if the user is logged in
const check_login_status = () => {
    const token = localStorage.getItem('wtsts_token');
    const role = localStorage.getItem('wtsts_role');
    if (token) {
        // Optionally, you can decode the token to check its validity
        // For example, using jwt-decode library
        // const decodedToken = jwt_decode(token);
        // const isExpired = decodedToken.exp < Date.now() / 1000;
        // If the token exists and is valid, redirect to specific page
        if (role == 'admin') {
            window.location.href = "page/admin/dashboard.html";
        }
        else if (role == 'user') {
            window.location.href = "page/user/pagination.html";
        }
    }
};
// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', check_login_status);
