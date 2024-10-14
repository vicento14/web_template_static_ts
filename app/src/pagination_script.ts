import { search_accounts, get_next_page, get_prev_page, th_order_by } from './pagination.js';

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  sessionStorage.setItem('accounts_table_c_th', '0');
  sessionStorage.setItem('accounts_table_employee_no_th', '2');
  sessionStorage.setItem('accounts_table_username_th', '4');
  sessionStorage.setItem('accounts_table_fullname_th', '6');
  sessionStorage.setItem('accounts_table_section_th', '8');
  sessionStorage.setItem('accounts_table_role_th', '10');
  search_accounts(1, 0);
});

// Type for the event
const handleKeyUp = (e: KeyboardEvent): void => {
  const paginationInput = document.getElementById("accounts_table_pagination") as HTMLInputElement;
  const current_page: number = parseInt(paginationInput.value.trim());
  const order_by_code: number = parseInt(sessionStorage.getItem('order_by_code') || '0');
  const total: number = parseInt(sessionStorage.getItem('count_rows') || '0');
  const last_page: number = parseInt(sessionStorage.getItem('last_page') || '0');

  if (e.key === "Enter") {
    e.preventDefault();
    console.log(total);
    if (current_page !== 0 && current_page <= last_page && total > 0) {
      search_accounts(current_page, order_by_code);
    }
  }
};

const paginationElement = document.getElementById("accounts_table_pagination");
if (paginationElement) {
  paginationElement.addEventListener("keyup", handleKeyUp);
}

(document.getElementById("searchReqBtn") as HTMLButtonElement).addEventListener('click', e => {
  search_accounts(1, 0);
});

(document.getElementById("btnPrevPage") as HTMLButtonElement).addEventListener('click', e => {
  get_prev_page();
});

(document.getElementById("btnNextPage") as HTMLButtonElement).addEventListener('click', e => {
  get_next_page();
});

(document.getElementById("c_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_c_th') || '0');
  th_order_by(order_by_code);
});

(document.getElementById("employee_no_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_employee_no_th') || '2');
  th_order_by(order_by_code);
});

(document.getElementById("username_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_username_th') || '4');
  th_order_by(order_by_code);
});

(document.getElementById("fullname_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_fullname_th') || '6');
  th_order_by(order_by_code);
});

(document.getElementById("section_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_section_th') || '8');
  th_order_by(order_by_code);
});

(document.getElementById("role_th") as HTMLElement).addEventListener('click', e => {
  const order_by_code: number = parseInt(sessionStorage.getItem('accounts_table_role_th') || '10');
  th_order_by(order_by_code);
});
