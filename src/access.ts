// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    userRouteFilter: currentUser?.permissions && currentUser.permissions.includes('sys:user'),
    roleRouteFilter: currentUser?.permissions && currentUser.permissions.includes('sys:role'),
    menuRouteFilter: currentUser?.permissions && currentUser.permissions.includes('sys:menu'),
    fcwRouteFilter: currentUser?.permissions && currentUser.permissions.includes('fcw')
  }
}
