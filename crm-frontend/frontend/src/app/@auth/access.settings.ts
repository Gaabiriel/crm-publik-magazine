export const authSettings = {
  funcionario: {
    view: ['user-list-view'],
  },
  administrador: {
    view: ['current-user', 'clientes'],
    create: ['current-user', 'users', 'clientes'],
    import: ['clientes'],
    remove: '*',
  },
};
