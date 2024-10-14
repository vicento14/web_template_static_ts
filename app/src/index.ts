// import $ from 'jquery';
// import Swal from "sweetalert2";
declare const Swal: any;

interface LoginResponse {
  message: string;
  token: string;
  username: string;
  full_name: string;
  section: string;
  role: string;
}

const login = (): void => {
  const loading: string = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" id="loading"></span>`;
  const loginButton = document.getElementById("login") as HTMLButtonElement;
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

  const username: string = (document.getElementById('username') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;

  $.ajax({
    url: 'http://127.0.0.1:91/Login/SignIn',
    type: 'POST',
    cache: false,
    crossDomain: true,
    data: {
      username: username,
      password: password
    },
    success: (response: LoginResponse) => {
      if (response.message === 'success') {
        localStorage.setItem('wtsts_token', response.token);
        localStorage.setItem('wtsts_username', response.username);
        localStorage.setItem('wtsts_full_name', response.full_name);
        localStorage.setItem('wtsts_section', response.section);
        localStorage.setItem('wtsts_role', response.role);

        if (response.role === 'admin') {
          window.location.href = "page/admin/dashboard.html";
        } else if (response.role === 'user') {
          window.location.href = "page/user/pagination.html";
        }
      } else {
        handleLoginError(response.message);
      }
    },
    error: (jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) => {
      console.error('Error:', textStatus, errorThrown);
    }
  });
}

const handleLoginError = (message: string): void => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.remove();
  }
  const loginButton = document.getElementById("login") as HTMLButtonElement;
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
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Account Sign In Error',
      text: `Call IT Personnel Immediately!!! They will fix it right away. Error: ${message}`,
      showConfirmButton: false,
      timer: 2000
    });
  }
}

document.getElementById('login_form')?.addEventListener('submit', e => {
  e.preventDefault();
  login();
});
