// import $ from 'jquery';
import { load_t_t1, load_t_t2, get_next_page } from './ts_lm.js';

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  load_t_t1();
});

// Table Responsive Scroll Event for Load More
const tableResElement = document.getElementById("t_table_res") as HTMLElement;

if (tableResElement) {
  tableResElement.addEventListener("scroll", function () {
    const scrollTop: number = tableResElement.scrollTop;
    const scrollHeight: number = tableResElement.scrollHeight;
    const offsetHeight: number = tableResElement.offsetHeight;

    // Check if the scroll reached the bottom
    if ((offsetHeight + scrollTop + 1) >= scrollHeight) {
      get_next_page();
    }
  });
}

(document.getElementById("aTableBack") as HTMLAnchorElement).addEventListener('click', e => {
  load_t_t1();
});

(document.getElementById("btnNextPage") as HTMLButtonElement).addEventListener('click', e => {
  get_next_page();
});

// Assuming you have a reference to the table or the parent element containing the rows
const table = document.getElementById('t_table') as HTMLTableElement; // Replace with your actual table ID

// Add event listener to the table
table.addEventListener('click', (event) => {
  // Check if the clicked element is a row with the class 't_t1_table_clickable_row'
  const row = (event.target as HTMLElement).closest('.t_t1_table_clickable_row');
  if (row) {
    // Get the data attributes
    const id = row.getAttribute('data-id');
    const c1 = row.getAttribute('data-c1');

    // Call your function with the parameters
    load_t_t2(`${id}~!~${c1}`);
  }
});