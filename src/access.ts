// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    userRouteFilter: currentUser?.permissions?.indexOf('sys:user'),
    roleRouteFilter: currentUser?.permissions?.indexOf('sys:role'),
    menuRouteFilter: false
  };
}
