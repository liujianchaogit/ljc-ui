import { request } from 'umi';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function accountLogin(params: LoginParamsType) {
  const { username, password, mobile, captcha, type } = params;
  return request<{ data: { access_token?: string } }>('/oauth/token', {
    method: 'POST',
    params: { username, password, grant_type: 'password' },
    errorHandler: undefined
  }).then(res => res?.data);
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  // return request('/api/login/outLogin');
}
