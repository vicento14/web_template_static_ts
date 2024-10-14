"use strict";
var _a;
const login = () => {
    const loading = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" id="loading"></span>`;
    const loginButton = document.getElementById("login");
    loginButton.insertAdjacentHTML('afterbegin', loading);
    loginButton.setAttribute('disabled', 'true');
    Swal.fire({
        icon: 'info',
        title: 'Signing In Please Wait...',
        text: 'Info',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    $.ajax({
        url: 'http://127.0.0.1:91/Login/SignIn',
        type: 'POST',
        cache: false,
        crossDomain: true,
        data: {
            username: username,
            password: password
        },
        success: (response) => {
            if (response.message === 'success') {
                localStorage.setItem('wtsts_token', response.token);
                localStorage.setItem('wtsts_username', response.username);
                localStorage.setItem('wtsts_full_name', response.full_name);
                localStorage.setItem('wtsts_section', response.section);
                localStorage.setItem('wtsts_role', response.role);
                if (response.role === 'admin') {
                    window.location.href = "page/admin/dashboard.html";
                }
                else if (response.role === 'user') {
                    window.location.href = "page/user/pagination.html";
                }
            }
            else {
                handleLoginError(response.message);
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error:', textStatus, errorThrown);
        }
    });
};
const handleLoginError = (message) => {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
        loadingElement.remove();
    }
    const loginButton = document.getElementById("login");
    loginButton.removeAttribute('disabled');
    Swal.close();
    if (message === 'failed') {
        Swal.fire({
            icon: 'info',
            title: 'Account Sign In',
            text: 'Sign In Failed. Maybe an incorrect credential or account not found',
            showConfirmButton: false,
            timer: 2000
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Account Sign In Error',
            text: `Call IT Personnel Immediately!!! They will fix it right away. Error: ${message}`,
            showConfirmButton: false,
            timer: 2000
        });
    }
};
(_a = document.getElementById('login_form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', e => {
    e.preventDefault();
    login();
});
