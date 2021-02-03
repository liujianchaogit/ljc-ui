import { request } from 'umi'

export async function login(body: API.LoginParams) {
  return request<API.Response<API.LoginResult>>('/oauth/token', {
    method: 'POST',
    params: { ...body, grant_type: 'password' },
    errorHandler: undefined
  })
}

export async function getCaptcha(params: { phone?: string }) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
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
