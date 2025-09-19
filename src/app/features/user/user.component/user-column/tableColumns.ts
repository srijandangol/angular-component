export const UserColumns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', sortable: true, filterable: true },
    { field: 'role', header: 'Role', sortable: true, filterable: true },
    { field: 'status', header: 'Status', sortable: true, filterable: true },
    { field: 'lastLogin', header: 'Last Login', sortable: true },
    { field: 'createdAt', header: 'Created At', sortable: true },
    { field: 'actions', header: 'Actions', type: 'action'as const }
  ];