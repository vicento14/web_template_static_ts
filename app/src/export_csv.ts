const export_csv = (table_id: string, filename: string, separator: string = ','): void => {
    // Select rows from table_id
    const rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll(`table#${table_id} tr`);
    
    // Construct csv
    const csv: string[] = [];
    for (let i = 0; i < rows.length; i++) {
        const row: string[] = [];
        const cols: NodeListOf<HTMLTableCellElement> = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            let data: string = cols[j].innerText
                .replace(/(\r\n|\n|\r)/gm, '')
                .replace(/(\s\s)/gm, ' ')
                .replace(/"/g, '""');
            
            // Push escaped string
            row.push(`"${data}"`);
        }
        csv.push(row.join(separator));
    }
    
    const csv_string: string = csv.join('\n');
    
    // Download it
    const link: HTMLAnchorElement = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
