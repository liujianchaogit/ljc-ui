// src/access.ts
import { IRoute } from 'umi';
export default function access(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState;
  return {
    userRouteFilter: (route: IRoute) => currentUser?.permissions?.includes(route.name),
    roleRouteFilter: (route: IRoute) => currentUser?.permissions?.includes(route.name),
    menuRouteFilter: (route: IRoute) => currentUser?.permissions?.includes(route.name),
    fcwRouteFilter: (route: IRoute) => currentUser?.permissions?.includes(route.name)
  }
}
