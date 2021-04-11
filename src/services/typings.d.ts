declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
    menus?: [];
    permissions?: string[]
  };

  type LoginParams = {
    username?: string;
    password?: string;
    mobile?: string;
    captcha?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type Response<T = any> = {
    success: boolean;
    data: T
    errorCode: string;
    errorMessage: string;
  };
}
