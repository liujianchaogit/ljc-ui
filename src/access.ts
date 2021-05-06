import { IRoute } from 'umi';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    routeFilter: (route: IRoute) => currentUser?.perms?.includes(route.name)
  };
}
