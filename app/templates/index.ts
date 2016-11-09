// index.ts used to export Component from this folder so you can import very easily
// using path/folder-name instead of path/folder-name/component-name
<% if (suffix == 'service') { %>
export * from './<%=folder_name %>';
<% } %>export * from './<%=folder_name %>.<%=suffix%>';
