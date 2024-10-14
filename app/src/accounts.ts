// import $ from 'jquery';
// import Swal from "sweetalert2";

import { serialize } from './serialize.js';

declare const Swal: any;

export interface UserAccount {
  id: number;
  idNumber: string;
  username: string;
  fullName: string;
  section: string;
  role: string;
  message?: string; // Optional property for error messages
}

export const load_accounts = (): void => {
  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/LoadUserAccounts',
    type: 'GET',
    cache: false,
    crossDomain: true,
    success: function (response: UserAccount[]) {
      let table_row = "";
      try {
        const response_array: UserAccount[] = response;
        console.log(response_array);
        if (response_array.length) {
          response_array.forEach((account, index) => {
            if (account.message) {
              console.log(account.message);
              table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
            } else {
              console.log(`${account.id} | ${account.idNumber} | ${account.username} | ${account.fullName} | ${account.section} | ${account.role}`);
              table_row += `
                <tr style="cursor:pointer;" class="modal-trigger accounts_table_clickable_row" 
                data-id="${account.id}" 
                data-id_number="${account.idNumber}" 
                data-username="${account.username}" 
                data-full_name="${account.fullName}" 
                data-section="${account.section}" 
                data-role="${account.role}"
                >
                <td>${index + 1}</td>
                <td>${account.idNumber}</td>
                <td>${account.username}</td>
                <td>${account.fullName}</td>
                <td>${account.section}</td>
                <td>${account.role}</td>
                </tr>
              `;
            }
          });
        } else {
          console.log('No Results Found');
          table_row += `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
        }
      } catch (error) {
        console.error(error);
      }

      const listOfAccountsElement = document.getElementById("list_of_accounts");
      if (listOfAccountsElement) {
        listOfAccountsElement.innerHTML = table_row;
      } else {
        console.log('Element with ID list_of_accounts not found.');
      }
    }
  });
}

export const search_accounts = (): void => {
  const employee_no = (document.getElementById('employee_no_search') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name_search') as HTMLInputElement).value;
  const user_type = (document.getElementById('user_type_search') as HTMLSelectElement).value;

  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/SearchUserAccounts',
    type: 'GET',
    cache: false,
    crossDomain: true,
    data: {
      employee_no: employee_no,
      full_name: full_name,
      user_type: user_type
    },
    success: function (response: UserAccount[]) {
      let table_row = "";
      try {
        const response_array: UserAccount[] = response;
        console.log(response_array);
        if (response_array.length) {
          response_array.forEach((account, index) => {
            if (account.message) {
              console.log(account.message);
              table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
            } else {
              console.log(`${account.id} | ${account.idNumber} | ${account.username} | ${account.fullName} | ${account.section} | ${account.role}`);
              table_row += `
                <tr style="cursor:pointer;" class="modal-trigger accounts_table_clickable_row" 
                data-id="${account.id}" 
                data-id_number="${account.idNumber}" 
                data-username="${account.username}" 
                data-full_name="${account.fullName}" 
                data-section="${account.section}" 
                data-role="${account.role}"
                >
                <td>${index + 1}</td>
                <td>${account.idNumber}</td>
                <td>${account.username}</td>
                <td>${account.fullName}</td>
                <td>${account.section}</td>
                <td>${account.role}</td>
                </tr>
              `;
            }
          });
        } else {
          console.log('No Results Found');
          table_row += `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
        }
      } catch (error) {
        console.error(error);
      }

      const listOfAccountsElement = document.getElementById("list_of_accounts");
      if (listOfAccountsElement) {
        listOfAccountsElement.innerHTML = table_row;
      } else {
        console.log('Element with ID list_of_accounts not found.');
      }
    }
  });
}

export const register_accounts = (): void => {
  const employee_no = (document.getElementById('employee_no') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name') as HTMLInputElement).value;
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const section = (document.getElementById('section') as HTMLInputElement).value;
  const user_type = (document.getElementById('user_type') as HTMLSelectElement).value;

  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/Insert',
    type: 'POST',
    cache: false,
    crossDomain: true,
    data: {
      Id: 0,
      IdNumber: employee_no,
      FullName: full_name,
      Username: username,
      Password: password,
      Section: section,
      Role: user_type
    },
    success: function (response: { message: string; }) {
      if (response.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Recorded!!!',
          text: 'Success',
          showConfirmButton: false,
          timer: 1000
        });
        // Clear input fields
        (document.getElementById("employee_no") as HTMLInputElement).value = '';
        (document.getElementById("full_name") as HTMLInputElement).value = '';
        (document.getElementById("username") as HTMLInputElement).value = '';
        (document.getElementById("password") as HTMLInputElement).value = '';
        (document.getElementById("section") as HTMLInputElement).value = '';
        (document.getElementById("user_type") as HTMLSelectElement).value = '';
        load_accounts();
        $('#new_account').modal('hide');
      } else if (response.message === 'Already Exist') {
        Swal.fire({
          icon: 'info',
          title: 'Duplicate Data !!!',
          text: 'Information',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error !!!',
          text: 'Error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
}

export const get_accounts_details = (param: string) => {
  const string = param.split('~!~');
  const id = string[0];
  const id_number = string[1];
  const username = string[2];
  const full_name = string[3];
  const section = string[4];
  const role = string[5];

  // Update Account Modal
  fetch('../../modals/update_account.html')
    .then(response => response.text())
    .then(data => {
      // Create a temporary DOM element to hold the fetched HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      // Get the template from the fetched HTML
      const template: HTMLTemplateElement | null = tempDiv.querySelector('#update_account_template');
      if (!template) {
        console.error('Template not found');
        return;
      }
      const clone: DocumentFragment = document.importNode(template.content, true);

      // Append the cloned template to the body
      document.body.appendChild(clone);

      const update_account_form: HTMLFormElement | null = document.getElementById('update_account_form') as HTMLFormElement;
      if (update_account_form) {
        // Update Account Function
        // Add a submit event listener to the form
        update_account_form.addEventListener('submit', (e: Event) => {
          e.preventDefault();

          // Get the button that triggered the submit event
          const button: HTMLElement | null = document.activeElement as HTMLElement;

          // Check the id or name of the button
          if (button && button.id === 'btnUpdateAccount') {
            // Call the function for the first submit button
            update_account();
          } else if (button && button.id === 'btnDeleteAccount') {
            // Call the function for the delete button
            delete_account();
          }
        });
      } else {
        console.log('Element with ID update_account_form not found.');
      }

      (document.getElementById('id_account_update') as HTMLInputElement).value = id;
      (document.getElementById('employee_no_update') as HTMLInputElement).value = id_number;
      (document.getElementById('username_update') as HTMLInputElement).value = username;
      (document.getElementById('full_name_update') as HTMLInputElement).value = full_name;
      (document.getElementById('password_update') as HTMLInputElement).value = '';
      (document.getElementById('section_update') as HTMLInputElement).value = section;
      (document.getElementById('user_type_update') as HTMLSelectElement).value = role;

      // Show the modal using Bootstrap's modal method
      $('#update_account').modal('show');

      // Clean up the modal after it's closed
      $('#update_account').on('hidden.bs.modal', function () {
        $(this).remove(); // Remove modal from DOM
      });
    })
    .catch(error => console.error('Error loading modal template:', error));
}

export const update_account = (): void => {
  const id = (document.getElementById('id_account_update') as HTMLInputElement).value;
  const id_number = (document.getElementById('employee_no_update') as HTMLInputElement).value;
  const username = (document.getElementById('username_update') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name_update') as HTMLInputElement).value;
  const password = (document.getElementById('password_update') as HTMLInputElement).value;
  const section = (document.getElementById('section_update') as HTMLInputElement).value;
  const role = (document.getElementById('user_type_update') as HTMLSelectElement).value;

  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/Update',
    type: 'POST',
    cache: false,
    crossDomain: true,
    data: {
      Id: id,
      IdNumber: id_number,
      FullName: full_name,
      Username: username,
      Password: password,
      Section: section,
      Role: role
    },
    success: function (response: { message: string; }) {
      if (response.message == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Succesfully Recorded!!!',
          text: 'Success',
          showConfirmButton: false,
          timer: 1000
        });
        (document.getElementById("employee_no_update") as HTMLInputElement).value = '';
        (document.getElementById("full_name_update") as HTMLInputElement).value = '';
        (document.getElementById("username_update") as HTMLInputElement).value = '';
        (document.getElementById("password_update") as HTMLInputElement).value = '';
        (document.getElementById("section_update") as HTMLInputElement).value = '';
        (document.getElementById("user_type_update") as HTMLSelectElement).value = '';
        load_accounts();
        $('#update_account').modal('hide');
      } else if (response.message == 'duplicate') {
        Swal.fire({
          icon: 'info',
          title: 'Duplicate Data !!!',
          text: 'Information',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error !!!',
          text: 'Error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
}

export const delete_account = (): void => {
  const id = (document.getElementById('id_account_update') as HTMLInputElement).value;
  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/Delete',
    type: 'POST',
    cache: false,
    crossDomain: true,
    data: {
      Id: id
    },
    success: function (response: { message: string; }) {
      if (response.message == 'success') {
        Swal.fire({
          icon: 'info',
          title: 'Succesfully Deleted !!!',
          text: 'Information',
          showConfirmButton: false,
          timer: 1000
        });
        (document.getElementById("employee_no_update") as HTMLInputElement).value = '';
        (document.getElementById("full_name_update") as HTMLInputElement).value = '';
        (document.getElementById("username_update") as HTMLInputElement).value = '';
        (document.getElementById("password_update") as HTMLInputElement).value = '';
        (document.getElementById("section_update") as HTMLInputElement).value = '';
        (document.getElementById("user_type_update") as HTMLSelectElement).value = '';
        load_accounts();
        $('#update_account').modal('hide');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error !!!',
          text: 'Error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
}

export const export_employees = (): void => {
  const employee_no = (document.getElementById('employee_no_search') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name_search') as HTMLInputElement).value;
  let url = "http://127.0.0.1:91/UserAccounts/Export";
  const data = serialize({
    employee_no: employee_no,
    full_name: full_name
  });
  url += "?" + data;
  window.open(url, '_blank');
}

export const export_employees3 = (): void => {
  const employee_no = (document.getElementById('employee_no_search') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name_search') as HTMLInputElement).value;
  let url = "http://127.0.0.1:91/UserAccounts/Export3";
  const data = serialize({
    employee_no: employee_no,
    full_name: full_name
  });
  url += "?" + data;
  window.open(url, '_blank');
}

export const upload_csv = (): void => {
  const file_form = (document.getElementById('file_form') as HTMLFormElement);
  const form_data = new FormData(file_form);
  
  $.ajax({
    url: 'http://127.0.0.1:91/UserAccounts/Import2',
    type: 'POST',
    cache: false,
    contentType: false,
    processData: false,
    crossDomain: true,
    data: form_data,
    dataType: 'json', // Expect JSON response
    beforeSend: (jqXHR: JQueryXHR, settings: JQueryAjaxSettings) => {
      Swal.fire({
        icon: 'info',
        title: 'Uploading Please Wait...',
        text: 'Info',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      // You can access settings.url and settings.type if needed
    },
    success: (response: { message: string; }) => {
      setTimeout(() => {
        Swal.close();
        if (response.message === 'success') {
          Swal.fire({
            icon: 'info',
            title: 'Upload CSV',
            text: 'Uploaded and updated successfully',
            showConfirmButton: false,
            timer: 1000
          });
          (document.getElementById("file2") as HTMLInputElement).value = '';
          load_accounts();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Upload CSV Error',
            text: `Error: ${response.message}`,
            showConfirmButton: false,
            timer: 1000
          });
        }
      }, 500);
    }
  })
    .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
      console.error(`System Error: Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${jqXHR.responseText}, method: POST ( HTTP ${jqXHR.status} - ${jqXHR.statusText} ) Press F12 to see Console Log for more info.`);
    });
}

export const popup1 = (): void => {
  const employee_no = (document.getElementById('employee_no_search') as HTMLInputElement).value;
  const full_name = (document.getElementById('full_name_search') as HTMLInputElement).value;
  let url = "http://127.0.0.1:91/UserAccounts/Export3";
  const data = serialize({
    employee_no: employee_no,
    full_name: full_name
  });
  url += "?" + data;
  PopupCenter(url, 'Popup Export Accounts 3', 1190, 600);
}