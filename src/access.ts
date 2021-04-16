// src/access.ts
import { IRoute } from 'umi';
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    userRouteFilter: (route: IRoute) => currentUser?.access?.includes(route.name),
    roleRouteFilter: (route: IRoute) => currentUser?.access?.includes(route.name),
    menuRouteFilter: (route: IRoute) => currentUser?.access?.includes(route.name),
    fcwRouteFilter: (route: IRoute) => currentUser?.access?.includes(route.name)
  }
}
