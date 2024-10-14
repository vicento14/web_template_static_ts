// import $ from 'jquery';
// AJAX IN PROGRESS GLOBAL VARS
let search_accounts_ajax_in_progress = false;
export const th_order_by = (order_by_code) => {
    const current_page = parseInt(document.getElementById("accounts_table_pagination").value.trim());
    // Table Header Sort Behavior
    switch (order_by_code) {
        case 0:
        case 1:
            sessionStorage.setItem('accounts_table_employee_no_th', '2');
            sessionStorage.setItem('accounts_table_username_th', '4');
            sessionStorage.setItem('accounts_table_fullname_th', '6');
            sessionStorage.setItem('accounts_table_section_th', '8');
            sessionStorage.setItem('accounts_table_role_th', '10');
            break;
        case 2:
        case 3:
            sessionStorage.setItem('accounts_table_c_th', '0');
            sessionStorage.setItem('accounts_table_username_th', '4');
            sessionStorage.setItem('accounts_table_fullname_th', '6');
            sessionStorage.setItem('accounts_table_section_th', '8');
            sessionStorage.setItem('accounts_table_role_th', '10');
            break;
        case 4:
        case 5:
            sessionStorage.setItem('accounts_table_c_th', '0');
            sessionStorage.setItem('accounts_table_employee_no_th', '2');
            sessionStorage.setItem('accounts_table_fullname_th', '6');
            sessionStorage.setItem('accounts_table_section_th', '8');
            sessionStorage.setItem('accounts_table_role_th', '10');
            break;
        case 6:
        case 7:
            sessionStorage.setItem('accounts_table_c_th', '0');
            sessionStorage.setItem('accounts_table_employee_no_th', '2');
            sessionStorage.setItem('accounts_table_username_th', '4');
            sessionStorage.setItem('accounts_table_section_th', '8');
            sessionStorage.setItem('accounts_table_role_th', '10');
            break;
        case 8:
        case 9:
            sessionStorage.setItem('accounts_table_c_th', '0');
            sessionStorage.setItem('accounts_table_employee_no_th', '2');
            sessionStorage.setItem('accounts_table_username_th', '4');
            sessionStorage.setItem('accounts_table_fullname_th', '6');
            sessionStorage.setItem('accounts_table_role_th', '10');
            break;
        case 10:
        case 11:
            sessionStorage.setItem('accounts_table_c_th', '0');
            sessionStorage.setItem('accounts_table_employee_no_th', '2');
            sessionStorage.setItem('accounts_table_username_th', '4');
            sessionStorage.setItem('accounts_table_fullname_th', '6');
            sessionStorage.setItem('accounts_table_section_th', '8');
            break;
        default:
            break;
    }
    search_accounts(current_page, order_by_code);
};
export const get_prev_page = () => {
    const current_page = parseInt(sessionStorage.getItem('accounts_table_pagination') || '0');
    const order_by_code = parseInt(sessionStorage.getItem('order_by_code') || '0');
    const total = parseInt(sessionStorage.getItem('count_rows') || '0');
    const prev_page = current_page - 1;
    if (prev_page > 0 && total > 0) {
        search_accounts(prev_page, order_by_code);
    }
};
export const get_next_page = () => {
    const current_page = parseInt(sessionStorage.getItem('accounts_table_pagination') || '0');
    const order_by_code = parseInt(sessionStorage.getItem('order_by_code') || '0');
    const total = parseInt(sessionStorage.getItem('count_rows') || '0');
    const last_page = parseInt(sessionStorage.getItem('last_page') || '0');
    const next_page = current_page + 1;
    if (next_page <= last_page && total > 0) {
        search_accounts(next_page, order_by_code);
    }
};
export const count_accounts = () => {
    const employee_no = sessionStorage.getItem('employee_no_search');
    const full_name = sessionStorage.getItem('full_name_search');
    const user_type = sessionStorage.getItem('user_type_search');
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
            const btnNextPage = document.getElementById("btnNextPage");
            const btnPrevPage = document.getElementById("btnPrevPage");
            if (total > 0) {
                load_accounts_pagination();
                if (btnPrevPage) {
                    btnPrevPage.removeAttribute('disabled');
                }
                if (btnNextPage) {
                    btnNextPage.removeAttribute('disabled');
                }
                document.getElementById("accounts_table_pagination").removeAttribute('disabled');
            }
            else {
                if (btnPrevPage) {
                    btnPrevPage.setAttribute('disabled', 'true');
                }
                if (btnNextPage) {
                    btnNextPage.setAttribute('disabled', 'true');
                }
                document.getElementById("accounts_table_pagination").setAttribute('disabled', 'true');
            }
        }
    });
};
export const load_accounts_pagination = () => {
    const employee_no = sessionStorage.getItem('employee_no_search');
    const full_name = sessionStorage.getItem('full_name_search');
    const user_type = sessionStorage.getItem('user_type_search');
    const current_page = parseInt(sessionStorage.getItem('accounts_table_pagination') || '0');
    $.ajax({
        url: 'http://127.0.0.1:91/UserAccounts/SearchPaginationP',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            employee_no,
            full_name,
            user_type
        },
        success: (response) => {
            var _a, _b, _c;
            let page_options = "";
            try {
                const response_array = response; // Assuming response is an array
                console.log(response_array);
                if (response_array.length) {
                    response_array.forEach(item => {
                        if (typeof item.message !== "undefined") {
                            console.log(item.message);
                            page_options += `<option>${item.message}</option>`;
                        }
                        else {
                            console.log(`${item}`);
                            page_options += `<option value="${item}">${item}</option>`;
                        }
                    });
                }
                else {
                    console.log('No Pages Found');
                }
            }
            catch (error) {
                console.error(error);
            }
            $('#accounts_table_paginations').html(page_options);
            $('#accounts_table_pagination').val(current_page.toString());
            const last_page_check = ((_a = document.getElementById("accounts_table_paginations")) === null || _a === void 0 ? void 0 : _a.innerHTML) || '';
            if (last_page_check !== '') {
                const last_page = ((_c = (_b = document.getElementById("accounts_table_paginations")) === null || _b === void 0 ? void 0 : _b.lastChild) === null || _c === void 0 ? void 0 : _c.textContent) || '';
                sessionStorage.setItem('last_page', last_page);
            }
        }
    });
};
export const search_accounts = (current_page, order_by_code) => {
    // If an AJAX call is already in progress, return immediately
    if (search_accounts_ajax_in_progress) {
        return;
    }
    //var order_by_code = 0;
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
                ;
                full_name = full_name_1 || '';
                ;
                user_type = user_type_1 || '';
                ;
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
        url: 'http://127.0.0.1:91/UserAccounts/SearchPageP',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            employee_no: employee_no,
            full_name: full_name,
            user_type: user_type,
            current_page: current_page,
            order_by_code: order_by_code
        },
        beforeSend: (jqXHR, settings) => {
            document.getElementById("btnPrevPage").setAttribute('disabled', 'true');
            document.getElementById("accounts_table_pagination").setAttribute('disabled', 'true');
            document.getElementById("btnNextPage").setAttribute('disabled', 'true');
            var loading = `
        <tr>
          <td colspan="6" style="text-align:center;">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>`;
            document.getElementById("list_of_accounts").innerHTML = loading;
        },
        success: function (response) {
            document.getElementById("btnPrevPage").removeAttribute('disabled');
            document.getElementById("accounts_table_pagination").removeAttribute('disabled');
            document.getElementById("btnNextPage").removeAttribute('disabled');
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
                            var c = 0;
                            // Table Header Sort Behavior
                            switch (order_by_code) {
                                case 0:
                                case 2:
                                case 4:
                                case 6:
                                case 8:
                                case 10:
                                    c = index;
                                    ++c;
                                    break;
                                case 1:
                                case 3:
                                case 5:
                                case 7:
                                case 9:
                                case 11:
                                    c = (response_array.length - index) + 1;
                                    --c;
                                    break;
                                default:
                            }
                            console.log(`${account.id} | ${account.idNumber} | ${account.username} | ${account.fullName} | ${account.section} | ${account.role}`);
                            table_row += `
                <tr>
                <td>${c}</td>
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
            $('#list_of_accounts').html(table_row);
            sessionStorage.setItem('accounts_table_pagination', current_page.toString());
            sessionStorage.setItem('order_by_code', order_by_code.toString());
            let headers = [];
            let headerIndex;
            const cTh = document.getElementById("c_th");
            const employeeNoTh = document.getElementById("employee_no_th");
            const usernameTh = document.getElementById("username_th");
            const fullnameTh = document.getElementById("fullname_th");
            const sectionTh = document.getElementById("section_th");
            const roleTh = document.getElementById("role_th");
            // Table Header Sort Behavior
            switch (order_by_code) {
                case 0:
                    sessionStorage.setItem('accounts_table_c_th', '1');
                    headers = [employeeNoTh, usernameTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = cTh;
                    cTh.innerHTML = ' # <i class="fas fa-sort-numeric-up ml-2">';
                    break;
                case 1:
                    sessionStorage.setItem('accounts_table_c_th', '0');
                    headers = [employeeNoTh, usernameTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = cTh;
                    cTh.innerHTML = ' # <i class="fas fa-sort-numeric-down-alt ml-2">';
                    break;
                case 2:
                    sessionStorage.setItem('accounts_table_employee_no_th', '3');
                    headers = [cTh, usernameTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = employeeNoTh;
                    employeeNoTh.innerHTML = ' Employee No. <i class="fas fa-sort-alpha-up ml-2">';
                    break;
                case 3:
                    sessionStorage.setItem('accounts_table_employee_no_th', '2');
                    headers = [cTh, usernameTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = employeeNoTh;
                    employeeNoTh.innerHTML = ' Employee No. <i class="fas fa-sort-alpha-down-alt ml-2">';
                    break;
                case 4:
                    sessionStorage.setItem('accounts_table_username_th', '5');
                    headers = [cTh, employeeNoTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = usernameTh;
                    usernameTh.innerHTML = ' Username <i class="fas fa-sort-alpha-up ml-2">';
                    break;
                case 5:
                    sessionStorage.setItem('accounts_table_username_th', '4');
                    headers = [cTh, employeeNoTh, fullnameTh, sectionTh, roleTh];
                    headerIndex = usernameTh;
                    usernameTh.innerHTML = ' Username <i class="fas fa-sort-alpha-down-alt ml-2">';
                    break;
                case 6:
                    sessionStorage.setItem('accounts_table_fullname_th', '7');
                    headers = [cTh, employeeNoTh, usernameTh, sectionTh, roleTh];
                    headerIndex = fullnameTh;
                    fullnameTh.innerHTML = ' Full Name <i class="fas fa-sort-alpha-up ml-2">';
                    break;
                case 7:
                    sessionStorage.setItem('accounts_table_fullname_th', '6');
                    headers = [cTh, employeeNoTh, usernameTh, sectionTh, roleTh];
                    headerIndex = fullnameTh;
                    fullnameTh.innerHTML = ' Full Name <i class="fas fa-sort-alpha-down-alt ml-2">';
                    break;
                case 8:
                    sessionStorage.setItem('accounts_table_section_th', '9');
                    headers = [cTh, employeeNoTh, usernameTh, fullnameTh, roleTh];
                    headerIndex = sectionTh;
                    sectionTh.innerHTML = ' Section <i class="fas fa-sort-alpha-up ml-2">';
                    break;
                case 9:
                    sessionStorage.setItem('accounts_table_section_th', '8');
                    headers = [cTh, employeeNoTh, usernameTh, fullnameTh, roleTh];
                    headerIndex = sectionTh;
                    sectionTh.innerHTML = ' Section <i class="fas fa-sort-alpha-down-alt ml-2">';
                    break;
                case 10:
                    sessionStorage.setItem('accounts_table_role_th', '11');
                    headers = [cTh, employeeNoTh, usernameTh, fullnameTh, sectionTh];
                    headerIndex = roleTh;
                    roleTh.innerHTML = ' User Type <i class="fas fa-sort-alpha-up ml-2">';
                    break;
                case 11:
                    sessionStorage.setItem('accounts_table_role_th', '10');
                    headers = [cTh, employeeNoTh, usernameTh, fullnameTh, sectionTh];
                    headerIndex = roleTh;
                    roleTh.innerHTML = ' User Type <i class="fas fa-sort-alpha-down-alt ml-2">';
                    break;
                default:
                    break;
            }
            // Reset other headers
            headers.forEach(header => {
                if (header !== headerIndex) {
                    header.innerHTML = header.innerHTML.split('<')[0].trim() + ' '; // Reset to original text without sorting icon
                }
            });
            count_accounts();
            // Set the flag back to false as the AJAX call has completed
            search_accounts_ajax_in_progress = false;
        }
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(`System Error : Call IT Personnel Immediately!!! They will fix it right away. Error: url: ${jqXHR.responseText}, method: GET ( HTTP ${jqXHR.status} - ${jqXHR.statusText} ) Press F12 to see Console Log for more info.`);
        document.getElementById("btnPrevPage").removeAttribute('disabled');
        document.getElementById("accounts_table_pagination").removeAttribute('disabled');
        document.getElementById("btnNextPage").removeAttribute('disabled');
        // Set the flag back to false as the AJAX call has completed
        search_accounts_ajax_in_progress = false;
    });
};
