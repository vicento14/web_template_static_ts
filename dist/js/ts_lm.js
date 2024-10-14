// import $ from 'jquery';
export const get_next_page = () => {
    const current_table = parseInt(sessionStorage.getItem('t_table_number') || '0', 10);
    const current_page = parseInt(sessionStorage.getItem('t_table_pagination') || '0', 10);
    const total = parseInt(sessionStorage.getItem('count_rows') || '0', 10);
    const last_page = parseInt(sessionStorage.getItem('last_page') || '0', 10);
    const next_page = current_page + 1;
    if (next_page <= last_page && total > 0) {
        switch (current_table) {
            case 1:
                load_t_t1_data(next_page);
                break;
            case 2:
                load_t_t2_data(next_page);
                break;
            default:
        }
    }
};
export const load_t_t1_data_last_page = () => {
    const current_page = parseInt(sessionStorage.getItem('t_table_pagination') || '0', 10);
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/LastPageTT1',
        type: 'GET',
        cache: false,
        crossDomain: true,
        success: function (response) {
            const number_of_page = parseInt(response.number_of_page, 10);
            sessionStorage.setItem('last_page', response.number_of_page);
            const total = parseInt(sessionStorage.getItem('count_rows') || '0', 10);
            const next_page = current_page + 1;
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
export const count_t_t1_data = () => {
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/CountTT1',
        type: 'GET',
        cache: false,
        crossDomain: true,
        success: function (response) {
            const total = parseInt(response.total);
            sessionStorage.setItem('count_rows', response.total);
            const count = `Total: ${response.total}`;
            $('#t_table_info').html(count);
            if (total > 0) {
                load_t_t1_data_last_page();
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
export const load_t_t1_table = () => {
    sessionStorage.setItem('t_table_number', '1');
    const tableElement = document.getElementById("t_table");
    if (tableElement) {
        tableElement.innerHTML = `
      <thead style="text-align: center;">
          <tr>
              <th> # </th>
              <th> C1 </th>
              <th> C2 </th>
              <th> C3 </th>
              <th> C4 </th>
              <th> Date Updated </th>
          </tr>
      </thead>
      <tbody id="t_t1_data" style="text-align: center;"></tbody>
    `;
    }
    else {
        console.error("Element with id 't_table' not found.");
    }
};
export const load_t_t1_data = (current_page) => {
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/LoadTT1',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            current_page: current_page
        },
        beforeSend: () => {
            const loading = `
        <tr id="loading">
          <td colspan="6" style="text-align:center;">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>`;
            if (current_page == 1) {
                document.getElementById("t_t1_data").innerHTML = loading;
                let t_table_page_first_result = 0;
                sessionStorage.setItem('t_table_page_first_result', t_table_page_first_result.toString());
            }
            else {
                $('#t_table tbody').append(loading);
            }
        },
        success: (response) => {
            $('#loading').remove();
            let table_row = "";
            try {
                const response_array = response;
                console.log(response_array);
                if (response_array.length) {
                    response_array.forEach((item, index) => {
                        if (item.message) {
                            console.log(item.message);
                            table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${item.message}</td></tr>`;
                        }
                        else {
                            console.log(`${item.id} | ${item.c1} | ${item.c2} | ${item.c3} | ${item.c4} | ${item.dateUpdated}`);
                            let c = parseInt(sessionStorage.getItem('t_table_page_first_result') || '0');
                            table_row += `
                <tr style="cursor:pointer;" class="modal-trigger t_t1_table_clickable_row" 
                data-id="${item.id}" 
                data-c1="${item.c1}" 
                >
                  <td>${++c}</td>
                  <td>${item.c1}</td>
                  <td>${item.c2}</td>
                  <td>${item.c3}</td>
                  <td>${item.c4}</td>
                  <td>${item.dateUpdated}</td>
                </tr>`;
                            sessionStorage.setItem('t_table_page_first_result', c.toString());
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
            if (current_page == 1) {
                $('#t_table tbody').html(table_row);
            }
            else {
                $('#t_table tbody').append(table_row);
            }
            sessionStorage.setItem('t_table_pagination', current_page.toString());
            document.getElementById("lbl_c1").innerHTML = '';
            $('#t_t1_breadcrumb').hide();
            count_t_t1_data();
        }
    });
};
export const load_t_t1 = () => {
    load_t_t1_table();
    setTimeout(() => {
        load_t_t1_data(1);
    }, 500);
};
export const load_t_t2_data_last_page = () => {
    var c1 = sessionStorage.getItem('load_t_t2_c1');
    const current_page = parseInt(sessionStorage.getItem('t_table_pagination') || '0', 10);
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/LastPageTT2',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            c1: c1
        },
        success: function (response) {
            const number_of_page = parseInt(response.number_of_page);
            sessionStorage.setItem('last_page', response.number_of_page);
            const total = parseInt(sessionStorage.getItem('count_rows') || '0', 10);
            const next_page = current_page + 1;
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
export const count_t_t2_data = () => {
    var c1 = sessionStorage.getItem('load_t_t2_c1');
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/CountTT2',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            c1: c1
        },
        success: function (response) {
            const total = parseInt(response.total);
            sessionStorage.setItem('count_rows', response.total);
            const count = `Total: ${response.total}`;
            $('#t_table_info').html(count);
            if (total > 0) {
                load_t_t2_data_last_page();
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
export const load_t_t2_table = () => {
    sessionStorage.setItem('t_table_number', '2');
    const tableElement = document.getElementById("t_table");
    if (tableElement) {
        tableElement.innerHTML = `
        <thead style="text-align: center;">
            <tr>
                <th> # </th>
                <th> C1 </th>
                <th> D1 </th>
                <th> D2 </th>
                <th> D3 </th>
                <th> Date Updated </th>
            </tr>
        </thead>
        <tbody id="t_t2_data" style="text-align: center;"></tbody>
      `;
    }
    else {
        console.error("Element with id 't_table' not found.");
    }
};
export const load_t_t2_data = (current_page) => {
    var _a;
    var c1 = (_a = sessionStorage.getItem('load_t_t2_c1')) !== null && _a !== void 0 ? _a : '';
    $.ajax({
        url: 'http://127.0.0.1:91/TTSLM/LoadTT2',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            c1: c1,
            current_page: current_page
        },
        beforeSend: () => {
            const loading = `
        <tr id="loading">
          <td colspan="6" style="text-align:center;">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>`;
            if (current_page == 1) {
                document.getElementById("t_t2_data").innerHTML = loading;
                let t_table_page_first_result = 0;
                sessionStorage.setItem('t_table_page_first_result', t_table_page_first_result.toString());
            }
            else {
                $('#t_table tbody').append(loading);
            }
        },
        success: function (response) {
            $('#loading').remove();
            var table_row = "";
            try {
                const response_array = response;
                console.log(response_array);
                if (response_array.length) {
                    response_array.forEach((item, index) => {
                        if (item.message) {
                            console.log(item.message);
                            table_row += `<tr><td colspan="6" style="text-align:center; color:red;">${item.message}</td></tr>`;
                        }
                        else {
                            console.log(`${item.id} | ${item.c1} | ${item.d1} | ${item.d2} | ${item.d3} | ${item.dateUpdated}`);
                            let c = parseInt(sessionStorage.getItem('t_table_page_first_result') || '0');
                            table_row += `
                <tr>
                  <td>${++c}</td>
                  <td>${item.c1}</td>
                  <td>${item.d1}</td>
                  <td>${item.d2}</td>
                  <td>${item.d3}</td>
                  <td>${item.dateUpdated}</td>
                </tr>`;
                            sessionStorage.setItem('t_table_page_first_result', c.toString());
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
            if (current_page == 1) {
                $('#t_table tbody').html(table_row);
            }
            else {
                $('#t_table tbody').append(table_row);
            }
            sessionStorage.setItem('t_table_pagination', current_page.toString());
            const lblC1Element = document.getElementById("lbl_c1");
            if (lblC1Element) {
                lblC1Element.innerHTML = c1;
            }
            else {
                console.error("Element with ID 'lbl_c1' not found.");
            }
            $('#t_t1_breadcrumb').show();
            count_t_t2_data();
        }
    });
};
export const load_t_t2 = (param) => {
    var string = param.split('~!~');
    var id = string[0];
    var c1 = string[1];
    sessionStorage.setItem('load_t_t2_c1', c1);
    load_t_t2_table();
    setTimeout(() => {
        load_t_t2_data(1);
    }, 500);
};
