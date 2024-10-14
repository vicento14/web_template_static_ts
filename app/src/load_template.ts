// import $ from 'jquery';

export function load_template(url: string, elementId: string): void {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data: string) => {
      const element = document.getElementById(elementId);

      if (element) {
        element.innerHTML = data;

        if (elementId == 'sidebar') {
          const full_name = localStorage.getItem('wtsts_full_name');
          const section = localStorage.getItem('wtsts_section');
  
          const sidebarTitleRole = document.getElementById('sidebar_title_role');
          const sidebarName = document.getElementById('sidebar_name');

          if (sidebarTitleRole && section) {
            sidebarTitleRole.innerHTML = `&ensp;WEB &ensp;|&ensp; ${section}`;
          }
          if (sidebarName && full_name) {
            sidebarName.innerHTML = full_name;
          }
  
          let url_path = window.location.pathname;
  
          const activeMenuItems: { [key: string]: string } = {
            "/web_template_static_ts/page/admin/dashboard.html": 'sidebar_menu_label_dashboard',
            "/web_template_static_ts/page/admin/accounts.html": 'sidebar_menu_label_accounts',
            "/web_template_static_ts/page/admin/sample1.html": 'sidebar_menu_label_sample1',
            "/web_template_static_ts/page/user/pagination.html": 'sidebar_menu_label_pagination',
            "/web_template_static_ts/page/user/load_more.html": 'sidebar_menu_label_load_more',
            "/web_template_static_ts/page/user/table_switching.html": 'sidebar_menu_label_table_switching',
            "/web_template_static_ts/page/user/ts_lm.html": 'sidebar_menu_label_ts_lm',
            "/web_template_static_ts/page/user/keyup_search.html": 'sidebar_menu_label_keyup_search',
          };

          const activeMenuItem = activeMenuItems[url_path] || activeMenuItems[`${url_path}#`];
          if (activeMenuItem) {
            const activeElement = document.getElementById(activeMenuItem);
            if (activeElement) {
              activeElement.classList.add('active');
            }
          }
  
          // Logout Modal
          const logoutButton = document.getElementById('btnLogoutSidebar');
          if (logoutButton) {
            logoutButton.addEventListener('click', function () {
              fetch('../../modals/logout_modal.html')
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.text();
                })
                .then((data: string) => {
                  // Create a temporary DOM element to hold the fetched HTML
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = data;
  
                  // Get the template from the fetched HTML
                  const template: HTMLTemplateElement | null = tempDiv.querySelector('#logout_modal_template');
                  if (!template) {
                    console.error('Template not found');
                    return;
                  }
                  const clone: DocumentFragment = document.importNode(template.content, true);
  
                  // Append the cloned template to the body
                  document.body.appendChild(clone);
  
                  const logout_modal_form: HTMLFormElement | null = document.getElementById('logout_modal_form') as HTMLFormElement;
                  if (logout_modal_form) {
                    // Logout Function
                    logout_modal_form.addEventListener('submit', function (e) {
                      e.preventDefault();
  
                      localStorage.removeItem('wtsts_token');
                      localStorage.removeItem('wtsts_username');
                      localStorage.removeItem('wtsts_full_name');
                      localStorage.removeItem('wtsts_section');
                      localStorage.removeItem('wtsts_role');
                      
                      window.location.href = '../../';
                    });
                  } else {
                    console.log('Element with ID logout_modal_form not found.');
                  }
  
                  // Show the modal using Bootstrap's modal method
                  $('#logout_modal').modal('show');
  
                  // Clean up the modal after it's closed
                  $('#logout_modal').on('hidden.bs.modal', function () {
                    $(this).remove(); // Remove modal from DOM
                  });
                })
                .catch(error => console.error('Error loading modal template:', error));
            });
          } else {
            console.log('Element with ID btnLogoutSidebar not found.');
          }
        } else if (elementId == 'content_header') {
          let url_path = window.location.pathname;

          const pageTitles: { [key: string]: string } = {
            "/web_template_static_ts/page/admin/dashboard.html": 'Dashboard',
            "/web_template_static_ts/page/admin/accounts.html": 'Account Management',
            "/web_template_static_ts/page/admin/sample1.html": 'Sample 1',
            "/web_template_static_ts/page/user/pagination.html": 'Pagination',
            "/web_template_static_ts/page/user/load_more.html": 'Load More',
            "/web_template_static_ts/page/user/table_switching.html": 'Table Switching',
            "/web_template_static_ts/page/user/ts_lm.html": 'Table Switch + Load More',
            "/web_template_static_ts/page/user/keyup_search.html": 'Keyup Search',
          };

          const pageTitle = pageTitles[url_path] || pageTitles[`${url_path}#`];
          
          if (pageTitle) {
            document.getElementById('content_header_page_title')!.innerHTML = pageTitle;
            document.getElementById('content_header_page_title_bc')!.innerHTML = pageTitle;
          }
        }
      } else {
        console.log(`element ID ${elementId} doesn't exist`);
      }
    })
    .catch(error => console.error('Error loading template:', error));
}