// import $ from 'jquery';
// import Swal from "sweetalert2";
import { serialize } from './serialize.js';
export const load_accounts = () => {
    const xhr = new XMLHttpRequest();
    const url = "http://127.0.0.1:91/Sample1/LoadUserAccountsJson";
    const type = "GET";
    const loading = `<tr><td colspan="6" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
    document.getElementById("list_of_accounts").innerHTML = loading;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = xhr.responseText;
            if (xhr.status === 200) {
                try {
                    const response_array = JSON.parse(response);
                    console.log(response_array);
                    if (response_array.length) {
                        document.getElementById("list_of_accounts").innerHTML = '';
                        response_array.forEach((account, index) => {
                            if (account.message) {
                                console.log(account.message);
                                const table_row = `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
                                document.getElementById("list_of_accounts").innerHTML = table_row;
                            }
                            else {
                                console.log(`${account.id} | ${account.idNumber} | ${account.username} | ${account.fullName} | ${account.section} | ${account.role}`);
                                const table_row = `
                  <tr>
                    <td>
                      <p class="mb-0">
                        <label class="mb-0">
                          <input type="checkbox" class="singleCheck" value="${account.id}" />
                          <span></span>
                        </label>
                      </p>
                    </td>
                    <td style="cursor:pointer;" class="modal-trigger accounts_table_clickable_row" 
                      data-id="${account.id}" 
                      data-id_number="${account.idNumber}" 
                      data-username="${account.username}" 
                      data-full_name="${account.fullName}" 
                      data-section="${account.section}" 
                      data-role="${account.role}"
                      >${index + 1}</td>
                    <td>${account.idNumber}</td>
                    <td>${account.username}</td>
                    <td>${account.fullName}</td>
                    <td>${account.section}</td>
                    <td>${account.role}</td>
                  </tr>
                `;
                                document.getElementById("list_of_accounts").insertAdjacentHTML("beforeend", table_row);
                            }
                        });
                    }
                    else {
                        console.log('No Results Found');
                        const table_row = `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
                        document.getElementById("list_of_accounts").innerHTML = table_row;
                    }
                }
                catch (error) {
                    console.error('Parsing error:', error);
                }
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
};
export const search_accounts = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    const user_type = document.getElementById('user_type_search').value;
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:91/Sample1/SearchUserAccountsJson";
    let type = "GET";
    var loading = `<tr><td colspan="6" style="text-align:center;"><div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></td></tr>`;
    var data = serialize({
        employee_no: employee_no,
        full_name: full_name,
        user_type: user_type
    });
    url += "?" + data;
    document.getElementById("list_of_accounts").innerHTML = loading;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                try {
                    const response_array = JSON.parse(response);
                    console.log(response_array);
                    if (response_array.length) {
                        document.getElementById("list_of_accounts").innerHTML = '';
                        response_array.forEach((account, index) => {
                            if (account.message) {
                                console.log(account.message);
                                const table_row = `<tr><td colspan="6" style="text-align:center; color:red;">${account.message}</td></tr>`;
                                document.getElementById("list_of_accounts").innerHTML = table_row;
                            }
                            else {
                                console.log(`${account.id} | ${account.idNumber} | ${account.username} | ${account.fullName} | ${account.section} | ${account.role}`);
                                const table_row = `
                  <tr>
                    <td>
                      <p class="mb-0">
                        <label class="mb-0">
                          <input type="checkbox" class="singleCheck" value="${account.id}" />
                          <span></span>
                        </label>
                      </p>
                    </td>
                    <td style="cursor:pointer;" class="modal-trigger accounts_table_clickable_row" 
                      data-id="${account.id}" 
                      data-id_number="${account.idNumber}" 
                      data-username="${account.username}" 
                      data-full_name="${account.fullName}" 
                      data-section="${account.section}" 
                      data-role="${account.role}"
                      >${index + 1}</td>
                    <td>${account.idNumber}</td>
                    <td>${account.username}</td>
                    <td>${account.fullName}</td>
                    <td>${account.section}</td>
                    <td>${account.role}</td>
                  </tr>
                `;
                                document.getElementById("list_of_accounts").insertAdjacentHTML("beforeend", table_row);
                            }
                        });
                    }
                    else {
                        console.log('No Results Found');
                        var table_row = `<tr><td colspan="6" style="text-align:center; color:red;">No Results Found</td></tr>`;
                        document.getElementById("list_of_accounts").innerHTML = table_row;
                    }
                }
                catch (error) {
                    console.error('Parsing error:', error);
                }
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
};
export const register_accounts = () => {
    const employee_no = document.getElementById('employee_no').value;
    const full_name = document.getElementById('full_name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const section = document.getElementById('section').value;
    const user_type = document.getElementById('user_type').value;
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:91/Sample1/Insert";
    let type = "POST";
    var data = serialize({
        Id: 0,
        IdNumber: employee_no,
        FullName: full_name,
        Username: username,
        Password: password,
        Section: section,
        Role: user_type
    });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                try {
                    let response_array = JSON.parse(response);
                    if (response_array.message == 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Succesfully Recorded!!!',
                            text: 'Success',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        document.getElementById("employee_no").value = '';
                        document.getElementById("full_name").value = '';
                        document.getElementById("username").value = '';
                        document.getElementById("password").value = '';
                        document.getElementById("section").value = '';
                        document.getElementById("user_type").value = '';
                        load_accounts();
                        $('#new_account').modal('hide');
                    }
                    else if (response_array.message == 'Already Exist') {
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
                catch (error) {
                    console.error('Parsing error:', error);
                }
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
};
export const get_accounts_details = (el) => {
    const id = el.dataset.id;
    const id_number = el.dataset.id_number;
    const username = el.dataset.username;
    const full_name = el.dataset.full_name;
    const section = el.dataset.section;
    const role = el.dataset.role;
    // Update Account Modal
    fetch('../../modals/update_account.html')
        .then((response) => response.text())
        .then((data) => {
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
        // Set values in the form
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
        .catch((error) => console.error('Error loading modal template:', error));
};
export const update_account = () => {
    const id = document.getElementById('id_account_update').value;
    const id_number = document.getElementById('employee_no_update').value;
    const username = document.getElementById('username_update').value;
    const full_name = document.getElementById('full_name_update').value;
    const password = document.getElementById('password_update').value;
    const section = document.getElementById('section_update').value;
    const role = document.getElementById('user_type_update').value;
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:91/Sample1/Update";
    let type = "POST";
    var data = serialize({
        Id: id,
        IdNumber: id_number,
        FullName: full_name,
        Username: username,
        Password: password,
        Section: section,
        Role: role
    });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                try {
                    let response_array = JSON.parse(response);
                    if (response_array.message == 'success') {
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
                    else if (response_array.message == 'duplicate') {
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
                catch (error) {
                    console.error('Parsing error:', error);
                }
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
};
export const delete_account = () => {
    const id = document.getElementById('id_account_update').value;
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:91/Sample1/Delete";
    let type = "POST";
    var data = serialize({
        Id: id
    });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                try {
                    let response_array = JSON.parse(response);
                    if (response_array.message == 'success') {
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
                catch (error) {
                    console.error('Parsing error:', error);
                }
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
};
// Uncheck all checkboxes
export const uncheck_all = () => {
    const select_all = document.getElementById('check_all');
    if (select_all) {
        select_all.checked = false;
    }
    document.querySelectorAll(".singleCheck").forEach((el) => {
        el.checked = false;
    });
    get_checked_length();
};
// Check all checkboxes
export const select_all_func = () => {
    const select_all = document.getElementById('check_all');
    if (select_all) {
        if (select_all.checked) {
            console.log('check');
            document.querySelectorAll(".singleCheck").forEach((el) => {
                el.checked = true;
            });
        }
        else {
            console.log('uncheck');
            document.querySelectorAll(".singleCheck").forEach((el) => {
                el.checked = false;
            });
        }
    }
    get_checked_length();
};
// Get the length of checked checkboxes
export const get_checked_length = () => {
    const arr = [];
    document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el) => {
        arr.push(el.value);
    });
    console.log(arr);
    const numberOfChecked = arr.length;
    console.log(numberOfChecked);
    sessionStorage.setItem("count_delete_account_selected", numberOfChecked.toString());
    const checkboxControl = document.getElementById("checkbox_control");
    if (checkboxControl) {
        if (numberOfChecked > 0) {
            checkboxControl.removeAttribute('disabled');
        }
        else {
            checkboxControl.setAttribute('disabled', 'true');
        }
    }
};
export const delete_account_selected = () => {
    const arr = [];
    document.querySelectorAll("input.singleCheck[type='checkbox']:checked").forEach((el) => {
        arr.push(el.value);
    });
    console.log(arr);
    var numberOfChecked = arr.length;
    if (numberOfChecked > 0) {
        let xhr = new XMLHttpRequest();
        let url = "http://127.0.0.1:91/Sample1/DeleteSelected";
        let type = "POST";
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let response = xhr.responseText;
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    try {
                        let response_array = JSON.parse(response);
                        if (response_array.message == 'success') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Succesfully Deleted !!!',
                                text: 'Information',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            load_accounts();
                            document.getElementById("checkbox_control").setAttribute('disabled', 'true');
                            $('#confirm_delete_account_selected').modal('hide');
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
                    catch (error) {
                        console.error(error);
                    }
                }
                else {
                    console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
                }
            }
        };
        xhr.open(type, url, true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(arr));
    }
    else {
        Swal.fire({
            icon: 'info',
            title: 'No checkbox checked',
            text: 'Information',
            showConfirmButton: false,
            timer: 1000
        });
    }
};
export const export_employees = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    let url = "http://127.0.0.1:91/UserAccounts/Export";
    var data = serialize({
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
    var data = serialize({
        employee_no: employee_no,
        full_name: full_name
    });
    url += "?" + data;
    window.open(url, '_blank');
};
export const upload_csv = () => {
    var file_form = document.getElementById('file_form');
    var form_data = new FormData(file_form);
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:91/Sample1/Import3";
    let type = "POST";
    Swal.fire({
        icon: 'info',
        title: 'Uploading Please Wait...',
        text: 'Info',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = xhr.responseText;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                setTimeout(() => {
                    Swal.close();
                    try {
                        let response_array = JSON.parse(response);
                        if (response_array.message == 'success') {
                            Swal.fire({
                                icon: 'info',
                                title: 'Upload CSV',
                                text: 'Uploaded and updated successfully',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            load_accounts();
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Upload CSV Error',
                                text: `Error: ${response_array.message}`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                    document.getElementById("file2").value = '';
                }, 500);
            }
            else {
                console.error(`System Error: url: ${url}, method: ${type} ( HTTP ${xhr.status} - ${xhr.statusText} ) Press F12 to see Console Log for more info.`);
            }
        }
    };
    // Handle network errors
    xhr.onerror = () => {
        console.error('Request failed:', xhr.status, xhr.statusText);
    };
    xhr.open(type, url, true);
    xhr.send(form_data);
};
export const popup1 = () => {
    const employee_no = document.getElementById('employee_no_search').value;
    const full_name = document.getElementById('full_name_search').value;
    let url = "http://127.0.0.1:91/UserAccounts/Export3";
    var data = serialize({
        employee_no: employee_no,
        full_name: full_name
    });
    url += "?" + data;
    PopupCenter(url, 'Popup Export Accounts 3', 1190, 600);
};
