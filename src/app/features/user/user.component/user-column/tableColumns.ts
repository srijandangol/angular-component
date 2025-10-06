export const UserColumns = [
  { field: 'id', header: 'ID', sortable: true },
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    field: 'email',
    header: 'Email',
    sortable: true,
    filterable: true,
  },
  {
    field: 'role',
    header: 'Role',
    sortable: true,
    filterable: true,
    filterOptions: [
      { value: 'Admin', label: 'Admin' },
      { value: 'User', label: 'User' },
      { value: 'Manager', label: 'Manager' },
    ],
  },
  {
    field: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    filterOptions: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Suspended', label: 'Suspended' },
    ],
  },
  { field: 'lastLogin', header: 'Last Login', sortable: true },
  { field: 'createdAt', header: 'Created At', sortable: true },
  { field: 'actions', header: 'Actions', type: 'action' as const },
];
