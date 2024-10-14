import { search_accounts, doneTypingSearchAccounts, get_next_page } from './keyup_search.js';
// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
    search_accounts(1);
});
var typingTimerEmployeeNoSearch; // Timer identifier Employee No Search
var doneTypingInterval = 250; // Time in ms
// On keyup, start the countdown
document.getElementById("employee_no_search").addEventListener('keyup', e => {
    clearTimeout(typingTimerEmployeeNoSearch);
    typingTimerEmployeeNoSearch = setTimeout(doneTypingSearchAccounts, doneTypingInterval);
});
// On keydown, clear the countdown
document.getElementById("employee_no_search").addEventListener('keydown', e => {
    clearTimeout(typingTimerEmployeeNoSearch);
});
document.getElementById("searchReqBtn").addEventListener('click', e => {
    search_accounts(1);
});
document.getElementById("btnNextPage").addEventListener('click', e => {
    get_next_page();
});
