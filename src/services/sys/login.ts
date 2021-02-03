import { request } from 'umi'

export async function login(params: API.LoginParams) {
  return request<API.Response<API.Token>>('/oauth/token', {
    method: 'POST',
    params: { ...params, grant_type: 'password' },
    errorHandler: undefined
  })
}

export async function getCaptcha(params: { phone?: string }) {
  return request<API.Response<number>>('/api/login/captcha', {
    method: 'POST',
    params
  })
}

export async function logout(options?: { [key: string]: any }) {
  // return request<Record<string, any>>('/api/login/outLogin', {
  //   method: 'POST',
  //   ...(options || {}),
  // });
}
