// import $ from 'jquery';
// import Swal from "sweetalert2";
import { serialize } from './serialize.js';
export const load_accounts = () => {
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/LoadUserAccounts',
        type: 'GET',
        cache: false,
        crossDomain: true,
        success: function (response) {
            let table_row = "";
            try {
                const response_array = response;
                console.log(response_array);
                if (response_array.length) {
                    response_array.forEach((account, index) => {
                        if (account.message) {
                            console.log(account.message);
                            table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
                        }
                        else {
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
                }
                else {
                    console.log('No Results Found');
                    table_row += `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
                }
            }
            catch (error) {
                console.error(error);
            }
            const listOfAccountsElement = document.getElementById("list_of_accounts");
            if (listOfAccountsElement) {
                listOfAccountsElement.innerHTML = table_row;
            }
            else {
                console.log('Element with ID list_of_accounts not found.');
            }
        }
    });
};
export const search_accounts = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    const user_type = document.getElementById('user_type_search').value;
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
        success: function (response) {
            let table_row = "";
            try {
                const response_array = response;
                console.log(response_array);
                if (response_array.length) {
                    response_array.forEach((account, index) => {
                        if (account.message) {
                            console.log(account.message);
                            table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
                        }
                        else {
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
                }
                else {
                    console.log('No Results Found');
                    table_row += `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
                }
            }
            catch (error) {
                console.error(error);
            }
            const listOfAccountsElement = document.getElementById("list_of_accounts");
            if (listOfAccountsElement) {
                listOfAccountsElement.innerHTML = table_row;
            }
            else {
                console.log('Element with ID list_of_accounts not found.');
            }
        }
    });
};
export const register_accounts = () => {
    const employee_no = document.getElementById('employee_no').value;
    const full_name = document.getElementById('full_name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const section = document.getElementById('section').value;
    const user_type = document.getElementById('user_type').value;
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
        success: function (response) {
            if (response.message === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Recorded!!!',
                    text: 'Success',
                    showConfirmButton: false,
                    timer: 1000
                });
                // Clear input fields
                document.getElementById("employee_no").value = '';
                document.getElementById("full_name").value = '';
                document.getElementById("username").value = '';
                document.getElementById("password").value = '';
                document.getElementById("section").value = '';
                document.getElementById("user_type").value = '';
                load_accounts();
                $('#new_account').modal('hide');
            }
            else if (response.message === 'Already Exist') {
                Swal.fire({
                    icon: 'info',
                    title: 'Duplicate Data !!!',
                    text: 'Information',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
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
};
export const get_accounts_details = (param) => {
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
        const template = tempDiv.querySelector('#update_account_template');
        if (!template) {
            console.error('Template not found');
            return;
        }
        const clone = document.importNode(template.content, true);
        // Append the cloned template to the body
        document.body.appendChild(clone);
        const update_account_form = document.getElementById('update_account_form');
        if (update_account_form) {
            // Update Account Function
            // Add a submit event listener to the form
            update_account_form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Get the button that triggered the submit event
                const button = document.activeElement;
                // Check the id or name of the button
                if (button && button.id === 'btnUpdateAccount') {
                    // Call the function for the first submit button
                    update_account();
                }
                else if (button && button.id === 'btnDeleteAccount') {
                    // Call the function for the delete button
                    delete_account();
                }
            });
        }
        else {
            console.log('Element with ID update_account_form not found.');
        }
        document.getElementById('id_account_update').value = id;
        document.getElementById('employee_no_update').value = id_number;
        document.getElementById('username_update').value = username;
        document.getElementById('full_name_update').value = full_name;
        document.getElementById('password_update').value = '';
        document.getElementById('section_update').value = section;
        document.getElementById('user_type_update').value = role;
        // Show the modal using Bootstrap's modal method
        $('#update_account').modal('show');
        // Clean up the modal after it's closed
        $('#update_account').on('hidden.bs.modal', function () {
            $(this).remove(); // Remove modal from DOM
        });
    })
        .catch(error => console.error('Error loading modal template:', error));
};
export const update_account = () => {
    const id = document.getElementById('id_account_update').value;
    const id_number = document.getElementById('employee_no_update').value;
    const username = document.getElementById('username_update').value;
    const full_name = document.getElementById('full_name_update').value;
    const password = document.getElementById('password_update').value;
    const section = document.getElementById('section_update').value;
    const role = document.getElementById('user_type_update').value;
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
        success: function (response) {
            if (response.message == 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Succesfully Recorded!!!',
                    text: 'Success',
                    showConfirmButton: false,
                    timer: 1000
                });
                document.getElementById("employee_no_update").value = '';
                document.getElementById("full_name_update").value = '';
                document.getElementById("username_update").value = '';
                document.getElementById("password_update").value = '';
                document.getElementById("section_update").value = '';
                document.getElementById("user_type_update").value = '';
                load_accounts();
                $('#update_account').modal('hide');
            }
            else if (response.message == 'duplicate') {
                Swal.fire({
                    icon: 'info',
                    title: 'Duplicate Data !!!',
                    text: 'Information',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            else {
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
};
export const delete_account = () => {
    const id = document.getElementById('id_account_update').value;
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/Delete',
        type: 'POST',
        cache: false,
        crossDomain: true,
        data: {
            Id: id
        },
        success: function (response) {
            if (response.message == 'success') {
                Swal.fire({
                    icon: 'info',
                    title: 'Succesfully Deleted !!!',
                    text: 'Information',
                    showConfirmButton: false,
                    timer: 1000
                });
                document.getElementById("employee_no_update").value = '';
                document.getElementById("full_name_update").value = '';
                document.getElementById("username_update").value = '';
                document.getElementById("password_update").value = '';
                document.getElementById("section_update").value = '';
                document.getElementById("user_type_update").value = '';
                load_accounts();
                $('#update_account').modal('hide');
            }
            else {
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
};
export const export_employees = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    let url = "http://127.0.0.1:91/UserAccounts/Export";
    const data = serialize({
        employee_no: employee_no,
        full_name: full_name
    });
    url += "?" + data;
    window.open(url, '_blank');
};
export const export_employees3 = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    let url = "http://127.0.0.1:91/UserAccounts/Export3";
    const data = serialize({
        employee_no: employee_no,
        full_name: full_name
    });
    url += "?" + data;
    window.open(url, '_blank');
};
export const upload_csv = () => {
    const file_form = document.getElementById('file_form');
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
        beforeSend: (jqXHR, settings) => {
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
        success: (response) => {
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
                    document.getElementById("file2").value = '';
                    load_accounts();
                }
                else {
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
        .fail((jqXHR, textStatus, errorThrown) => {
        console.error(`System Error: Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${jqXHR.responseText}, method: POST ( HTTP ${jqXHR.status} - ${jqXHR.statusText} ) Press F12 to see Console Log for more info.`);
    });
};
export const popup1 = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    let url = "http://127.0.0.1:91/UserAccounts/Export3";
    const data = serialize({
        employee_no: employee_no,
        full_name: full_name
    });
    url += "?" + data;
    PopupCenter(url, 'Popup Export Accounts 3', 1190, 600);
};
