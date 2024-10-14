// import $ from 'jquery';
import { 
  delete_account_selected, 
  load_accounts, 
  search_accounts, 
  register_accounts, 
  get_accounts_details, 
  select_all_func, 
  get_checked_length, 
  export_employees, 
  export_employees3, 
  upload_csv, 
  popup1
} from './sample1.js';

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  load_accounts();

  // New Account Modal
  const btnAddAccountModal = document.getElementById('btnAddAccountModal') as HTMLButtonElement | null;
  if (btnAddAccountModal) {
    btnAddAccountModal.addEventListener('click', function () {
      fetch('../../modals/new_account.html')
        .then(response => response.text())
        .then(data => {
          // Create a temporary DOM element to hold the fetched HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;

          // Get the template from the fetched HTML
          const template = tempDiv.querySelector('#new_account_template') as HTMLTemplateElement | null;
          if (template) {
            const clone = document.importNode(template.content, true);

            // Append the cloned template to the body
            document.body.appendChild(clone);

            const new_account_form = document.getElementById('new_account_form') as HTMLFormElement | null;
            if (new_account_form) {
              // New Account Function
              new_account_form.addEventListener('submit', e => {
                e.preventDefault();
                register_accounts();
              });
            } else {
              console.log('Element with ID new_account_form not found.');
            }

            // Show the modal using Bootstrap's modal method
            $('#new_account').modal('show');

            // Clean up the modal after it's closed
            $('#new_account').on('hidden.bs.modal', function () {
              $(this).remove(); // Remove modal from DOM
            });
          } else {
            console.log('Template with ID new_account_template not found.');
          }
        })
        .catch(error => console.error('Error loading modal template:', error));
    });
  } else {
    console.log('Element with ID btnAddAccountModal not found.');
  }

  // Delete Account Selected Modal
  const checkbox_control = document.getElementById('checkbox_control') as HTMLInputElement | null;
  if (checkbox_control) {
    checkbox_control.addEventListener('click', function () {
      fetch('../../modals/confirm_delete_account_selected.html')
        .then(response => response.text())
        .then(data => {
          // Create a temporary DOM element to hold the fetched HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;

          // Get the template from the fetched HTML
          const template = tempDiv.querySelector('#confirm_delete_account_selected_template') as HTMLTemplateElement | null;
          if (template) {
            const clone = document.importNode(template.content, true);

            // Append the cloned template to the body
            document.body.appendChild(clone);

            const countDeleteAccountSelected = document.getElementById("count_delete_account_selected");

            const numberOfChecked = parseInt(sessionStorage.getItem("count_delete_account_selected") || "0");

            if (countDeleteAccountSelected) {
              countDeleteAccountSelected.innerHTML = `${numberOfChecked} Account Row/s Selected`;
            }

            const confirm_delete_account_selected_form = document.getElementById('confirm_delete_account_selected_form') as HTMLFormElement | null;
            if (confirm_delete_account_selected_form) {
              // New Account Function
              confirm_delete_account_selected_form.addEventListener('submit', e => {
                e.preventDefault();
                delete_account_selected();
              });
            } else {
              console.log('Element with ID confirm_delete_account_selected_form not found.');
            }

            // Show the modal using Bootstrap's modal method
            $('#confirm_delete_account_selected').modal('show');

            // Clean up the modal after it's closed
            $('#confirm_delete_account_selected').on('hidden.bs.modal', function () {
              $(this).remove(); // Remove modal from DOM
            });
          } else {
            console.log('Template with ID confirm_delete_account_selected_template not found.');
          }
        })
        .catch(error => console.error('Error loading modal template:', error));
    });
  } else {
    console.log('Element with ID checkbox_control not found.');
  }
});

(document.getElementById("searchReqBtn") as HTMLButtonElement).addEventListener('click', e => {
  search_accounts();
});

// Upload CSV
(document.getElementById("file2") as HTMLInputElement).addEventListener("change", e => {
  upload_csv();
});

// Export Employees
(document.getElementById("export_employees") as HTMLAnchorElement).addEventListener("click", e => {
  e.preventDefault();
  export_employees();
});

// Export Employees3
(document.getElementById("export_employees3") as HTMLAnchorElement).addEventListener("click", e => {
  e.preventDefault();
  export_employees3();
});

// Export CSV
(document.getElementById("export_csv") as HTMLAnchorElement).addEventListener("click", e => {
  e.preventDefault();
  const table_id: string = "accounts_table";
  const filename: string = 'Export-Accounts' + '_' + new Date().toLocaleDateString() + '.csv';
  export_csv(table_id, filename);
});

// Popup
(document.getElementById("popup1") as HTMLAnchorElement).addEventListener("click", e => {
  e.preventDefault();
  popup1();
});

(document.getElementById("check_all") as HTMLInputElement).addEventListener("click", e => {
  select_all_func();
});

// Assuming you have a reference to the table or the parent element containing the rows
const table = document.getElementById('accounts_table') as HTMLTableElement; // Replace with your actual table ID

// Add event listener to the table
table.addEventListener('click', (event) => {
  // Check if the clicked element is a td with the class 'accounts_table_clickable_row'
  const cell = (event.target as HTMLElement).closest('.accounts_table_clickable_row');
  if (cell) {
    // Create an object that matches the expected parameter structure
    const accountDetails = {
      dataset: {
        id: cell.getAttribute('data-id') || '',
        id_number: cell.getAttribute('data-id_number') || '',
        username: cell.getAttribute('data-username') || '',
        full_name: cell.getAttribute('data-full_name') || '',
        section: cell.getAttribute('data-section') || '',
        role: cell.getAttribute('data-role') || ''
      }
    };

    // Call your function with the constructed object
    get_accounts_details(accountDetails);
  }

  // Check if the clicked element is a checkbox
  const checkbox = (event.target as HTMLElement).closest('.singleCheck');
  if (checkbox) {
    // Call the function to get the checked length
    get_checked_length();
  }
});
