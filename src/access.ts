// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    userRouteFilter: currentUser?.permissions && currentUser.permissions.indexOf('sys:user') > -1,
    roleRouteFilter: currentUser?.permissions && currentUser.permissions.indexOf('sys:role') > -1,
    menuRouteFilter: currentUser?.permissions && currentUser.permissions.indexOf('sys:menu') > -1
  };
}
