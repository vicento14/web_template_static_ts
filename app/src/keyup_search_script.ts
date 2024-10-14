import { search_accounts, doneTypingSearchAccounts, get_next_page } from './keyup_search.js';

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  search_accounts(1);
});

var typingTimerEmployeeNoSearch: number | undefined; // Timer identifier Employee No Search
var doneTypingInterval = 250; // Time in ms

// On keyup, start the countdown
(document.getElementById("employee_no_search") as HTMLInputElement).addEventListener('keyup', e => {
  clearTimeout(typingTimerEmployeeNoSearch);
  typingTimerEmployeeNoSearch = setTimeout(doneTypingSearchAccounts, doneTypingInterval);
});

// On keydown, clear the countdown
(document.getElementById("employee_no_search") as HTMLInputElement).addEventListener('keydown', e => {
  clearTimeout(typingTimerEmployeeNoSearch);
});

(document.getElementById("searchReqBtn") as HTMLButtonElement).addEventListener('click', e => {
  search_accounts(1);
});

(document.getElementById("btnNextPage") as HTMLButtonElement).addEventListener('click', e => {
  get_next_page();
});