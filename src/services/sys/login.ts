import { request } from 'umi'

export async function login(params: API.LoginParams) {
  return request<API.Response>('/login', {
    method: 'POST',
    params,
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
  return request<Record<string, any>>('/logout', {
    method: 'POST'
  });
}
