import { search_accounts, get_next_page } from './load_more.js';
// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
    search_accounts(1);
});
// Reference: Table Responsive Scroll Event (Body)
/*window.onscroll = function(ev){
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
   get_next_page();
}*/
// Table Responsive Scroll Event for Load More
const tableResElement = document.getElementById("accounts_table_res");
if (tableResElement) {
    tableResElement.addEventListener("scroll", function () {
        const scrollTop = tableResElement.scrollTop;
        const scrollHeight = tableResElement.scrollHeight;
        const offsetHeight = tableResElement.offsetHeight;
        // Check if the scroll reached the bottom
        if ((offsetHeight + scrollTop + 1) >= scrollHeight) {
            get_next_page();
        }
    });
}
document.getElementById("searchReqBtn").addEventListener('click', e => {
    search_accounts(1);
});
document.getElementById("btnNextPage").addEventListener('click', e => {
    get_next_page();
});
