import axios, { AxiosError } from 'axios';


// DjangoのログインAPIエンドポイントを指定
const LOGIN_URL = 'http://localhost:8000/api/login/';

interface LoginResponse {
  access?: string;
  message?: string;
  messageErr?: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {

  try {
    const response = await axios.post(LOGIN_URL, {
      "username": username,
      "password": password
    });
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
      return { 
        access: token, 
        message: 'ログイン成功' 
      };
    } else {
      return { 
        messageErr: 'トークンが見つかりませんでした' 
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error);
      return {
        messageErr: error.response?.data?.detail 
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        messageErr: '予期しないエラーが発生しました'
      };
    }
  }
};
