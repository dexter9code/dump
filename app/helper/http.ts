import {apiClient} from './apiClient';

interface ReturnObj {
  message: string;
  token: string;
  name: string;
}

export async function sign_user(email: string, password: string) {
  const res = await apiClient.post('login', {
    email,
    password,
  });

  const data: ReturnObj | undefined = await res.data;

  return data;
}
export async function getInfo() {
  const res = await apiClient.get('user-info');

  const data = await res.data;

  return data;
}
