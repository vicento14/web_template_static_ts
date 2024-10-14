import { load_t_t1, load_t_t2 } from './table_switching.js';

// DOMContentLoaded function
document.addEventListener("DOMContentLoaded", () => {
  load_t_t1();
});

(document.getElementById("aTableBack") as HTMLAnchorElement).addEventListener('click', e => {
  load_t_t1();
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