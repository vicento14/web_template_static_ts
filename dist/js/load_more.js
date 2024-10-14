// import $ from 'jquery';
// AJAX IN PROGRESS GLOBAL VARS
let search_accounts_ajax_in_progress = false;
export const get_next_page = () => {
    const current_page = parseInt(sessionStorage.getItem('accounts_table_pagination') || '0', 10);
    const total = parseInt(sessionStorage.getItem('count_rows') || '0', 10);
    const last_page = parseInt(sessionStorage.getItem('last_page') || '0', 10);
    var next_page = current_page + 1;
    if (next_page <= last_page && total > 0) {
        search_accounts(next_page);
    }
};
export const count_accounts = () => {
    var employee_no = sessionStorage.getItem('employee_no_search');
    var full_name = sessionStorage.getItem('full_name_search');
    var user_type = sessionStorage.getItem('user_type_search');
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/Count',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            employee_no: employee_no,
            full_name: full_name,
            user_type: user_type
        },
        success: function (response) {
            const total = parseInt(response.total);
            sessionStorage.setItem('count_rows', response.total);
            const count = `Total: ${response.total}`;
            document.getElementById("accounts_table_info").innerHTML = count;
            if (total > 0) {
                load_accounts_last_page();
            }
            else {
                const btnNextPage = document.getElementById("btnNextPage");
                if (btnNextPage) {
                    btnNextPage.style.display = "none";
                    btnNextPage.setAttribute('disabled', 'true');
                }
            }
        }
    });
};
export const load_accounts_last_page = () => {
    var employee_no = sessionStorage.getItem('employee_no_search');
    var full_name = sessionStorage.getItem('full_name_search');
    var user_type = sessionStorage.getItem('user_type_search');
    const current_page = parseInt(sessionStorage.getItem('accounts_table_pagination') || '0', 10);
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/SearchLastPageL',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            employee_no: employee_no,
            full_name: full_name,
            user_type: user_type
        },
        success: function (response) {
            const number_of_page = parseInt(response.number_of_page);
            sessionStorage.setItem('last_page', response.number_of_page);
            const total = parseInt(sessionStorage.getItem('count_rows') || '0', 10);
            var next_page = current_page + 1;
            const btnNextPage = document.getElementById("btnNextPage");
            if (next_page > number_of_page || total < 1) {
                if (btnNextPage) {
                    btnNextPage.style.display = "none";
                    btnNextPage.setAttribute('disabled', 'true');
                }
            }
            else {
                if (btnNextPage) {
                    btnNextPage.style.display = "block";
                    btnNextPage.removeAttribute('disabled');
                }
            }
        }
    });
};
export const search_accounts = (current_page) => {
    // If an AJAX call is already in progress, return immediately
    if (search_accounts_ajax_in_progress) {
        return;
    }
    const employee_no_input = document.getElementById('employee_no_search');
    const full_name_input = document.getElementById('full_name_search');
    const user_type_input = document.getElementById('user_type_search');
    let employee_no = employee_no_input.value;
    let full_name = full_name_input.value;
    let user_type = user_type_input.value;
    const employee_no_1 = sessionStorage.getItem('employee_no_search');
    const full_name_1 = sessionStorage.getItem('full_name_search');
    const user_type_1 = sessionStorage.getItem('user_type_search');
    if (current_page > 1) {
        switch (true) {
            case employee_no !== employee_no_1:
            case full_name !== full_name_1:
            case user_type !== user_type_1:
                employee_no = employee_no_1 || '';
                full_name = full_name_1 || '';
                user_type = user_type_1 || '';
                break;
            default:
        }
    }
    else {
        sessionStorage.setItem('employee_no_search', employee_no);
        sessionStorage.setItem('full_name_search', full_name);
        sessionStorage.setItem('user_type_search', user_type);
    }
    // Set the flag to true as we're starting an AJAX call
    search_accounts_ajax_in_progress = true;
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/SearchPageL',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            employee_no: employee_no,
            full_name: full_name,
            user_type: user_type,
            current_page: current_page
        },
        beforeSend: (jqXHR, settings) => {
            document.getElementById("btnNextPage").setAttribute('disabled', 'true');
            var loading = `
        <tr id="loading">
          <td colspan="6" style="text-align:center;">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>`;
            if (current_page == 1) {
                document.getElementById("list_of_accounts").innerHTML = loading;
                let accounts_table_page_first_result = 0;
                sessionStorage.setItem('accounts_table_page_first_result', accounts_table_page_first_result.toString());
            }
            else {
                $('#accounts_table tbody').append(loading);
            }
        },
        success: function (response) {
            $('#loading').remove();
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
                            let c = parseInt(sessionStorage.getItem('accounts_table_page_first_result') || '0');
                            table_row += `
                <tr>
                  <td>${++c}</td>
                  <td>${account.idNumber}</td>
                  <td>${account.username}</td>
                  <td>${account.fullName}</td>
                  <td>${account.section}</td>
                  <td>${account.role}</td>
                </tr>
              `;
                            sessionStorage.setItem('accounts_table_page_first_result', c.toString());
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
            document.getElementById("btnNextPage").removeAttribute('disabled');
            if (current_page == 1) {
                $('#accounts_table tbody').html(table_row);
            }
            else {
                $('#accounts_table tbody').append(table_row);
            }
            sessionStorage.setItem('accounts_table_pagination', current_page.toString());
            count_accounts();
            // Set the flag back to false as the AJAX call has completed
            search_accounts_ajax_in_progress = false;
        }
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(`System Error : Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${jqXHR.responseText}, method: POST ( HTTP ${jqXHR.status} - ${jqXHR.statusText} ) Press F12 to see Console Log for more info.`);
        $('#loading').remove();
        document.getElementById("btnNextPage").removeAttribute('disabled');
        // Set the flag back to false as the AJAX call has completed
        search_accounts_ajax_in_progress = false;
    });
};
