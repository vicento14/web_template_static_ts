// import $ from 'jquery';
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
export const load_t_t1_data = () => {
    $.ajax({
        url: 'http://127.0.0.1:91/TT/LoadTT1',
        type: 'GET',
        cache: false,
        crossDomain: true,
        beforeSend: () => {
            const loading = `
        <tr id="loading">
          <td colspan="6" style="text-align:center;">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>`;
            document.getElementById("t_t1_data").innerHTML = loading;
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
                            table_row += `
                <tr style="cursor:pointer;" class="modal-trigger t_t1_table_clickable_row" 
                data-id="${item.id}" 
                data-c1="${item.c1}" 
                >
                  <td>${index + 1}</td>
                  <td>${item.c1}</td>
                  <td>${item.c2}</td>
                  <td>${item.c3}</td>
                  <td>${item.c4}</td>
                  <td>${item.dateUpdated}</td>
                </tr>`;
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
            document.getElementById("t_t1_data").innerHTML = table_row;
            document.getElementById("lbl_c1").innerHTML = '';
            $('#t_t1_breadcrumb').hide();
        }
    });
};
export const load_t_t1 = () => {
    load_t_t1_table();
    setTimeout(() => {
        load_t_t1_data();
    }, 500);
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
export const load_t_t2_data = () => {
    var _a;
    var c1 = (_a = sessionStorage.getItem('load_t_t2_c1')) !== null && _a !== void 0 ? _a : '';
    $.ajax({
        url: 'http://127.0.0.1:91/TT/LoadTT2',
        type: 'GET',
        cache: false,
        crossDomain: true,
        data: {
            c1: c1
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
            document.getElementById("t_t2_data").innerHTML = loading;
        },
        success: (response) => {
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
                            table_row += `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.c1}</td>
                  <td>${item.d1}</td>
                  <td>${item.d2}</td>
                  <td>${item.d3}</td>
                  <td>${item.dateUpdated}</td>
                </tr>`;
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
            document.getElementById("t_t2_data").innerHTML = table_row;
            const lblC1Element = document.getElementById("lbl_c1");
            if (lblC1Element) {
                lblC1Element.innerHTML = c1;
            }
            else {
                console.error("Element with ID 'lbl_c1' not found.");
            }
            $('#t_t1_breadcrumb').show();
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
        load_t_t2_data();
    }, 500);
};
