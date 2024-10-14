// import $ from 'jquery';
import { load_accounts, search_accounts, register_accounts, get_accounts_details, export_employees, export_employees3, upload_csv, popup1 } from './accounts.js';
// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
    load_accounts();
    // New Account Modal
    const btnAddAccountModal = document.getElementById('btnAddAccountModal');
    if (btnAddAccountModal) {
        btnAddAccountModal.addEventListener('click', function () {
            fetch('../../modals/new_account.html')
                .then(response => response.text())
                .then(data => {
                // Create a temporary DOM element to hold the fetched HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                // Get the template from the fetched HTML
                const template = tempDiv.querySelector('#new_account_template');
                if (template) {
                    const clone = document.importNode(template.content, true);
                    // Append the cloned template to the body
                    document.body.appendChild(clone);
                    const new_account_form = document.getElementById('new_account_form');
                    if (new_account_form) {
                        // New Account Function
                        new_account_form.addEventListener('submit', e => {
                            e.preventDefault();
                            register_accounts();
                        });
                    }
                    else {
                        console.log('Element with ID new_account_form not found.');
                    }
                    // Show the modal using Bootstrap's modal method
                    $('#new_account').modal('show');
                    // Clean up the modal after it's closed
                    $('#new_account').on('hidden.bs.modal', function () {
                        $(this).remove(); // Remove modal from DOM
                    });
                }
                else {
                    console.log('Template with ID new_account_template not found.');
                }
            })
                .catch(error => console.error('Error loading modal template:', error));
        });
    }
    else {
        console.log('Element with ID btnAddAccountModal not found.');
    }
});
document.getElementById("searchReqBtn").addEventListener('click', e => {
    search_accounts();
});
// Upload CSV
document.getElementById("file2").addEventListener("change", e => {
    upload_csv();
});
// Export Employees
document.getElementById("export_employees").addEventListener("click", e => {
    e.preventDefault();
    export_employees();
});
// Export Employees3
document.getElementById("export_employees3").addEventListener("click", e => {
    e.preventDefault();
    export_employees3();
});
// Export CSV
document.getElementById("export_csv").addEventListener("click", e => {
    e.preventDefault();
    const table_id = "accounts_table";
    const filename = 'Export-Accounts' + '_' + new Date().toLocaleDateString() + '.csv';
    export_csv(table_id, filename);
});
// Popup
document.getElementById("popup1").addEventListener("click", e => {
    e.preventDefault();
    popup1();
});
// Assuming you have a reference to the table or the parent element containing the rows
const table = document.getElementById('accounts_table'); // Replace with your actual table ID
// Add event listener to the table
table.addEventListener('click', (event) => {
    // Check if the clicked element is a row with the class 't_t1_table_clickable_row'
    const row = event.target.closest('.accounts_table_clickable_row');
    if (row) {
        // Get the data attributes
        const id = row.getAttribute('data-id');
        const id_number = row.getAttribute('data-id_number');
        const username = row.getAttribute('data-username');
        const full_name = row.getAttribute('data-full_name');
        const section = row.getAttribute('data-section');
        const role = row.getAttribute('data-role');
        // Call your function with the parameters
        get_accounts_details(`${id}~!~${id_number}~!~${username}~!~${full_name}~!~${section}~!~${role}`);
    }
});
