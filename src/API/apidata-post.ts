import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { USER_INFO ,posts, menus} from './apidata';

const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

const mock = new MockAdapter(api);

/*
mock.onPost('/user1').reply((config) => {
  const { email, password } = JSON.parse(config.data);
  if (email === USER_INFO.email && password === USER_INFO.password) {
    return [200, { token: USER_INFO.token, message:`Login success` }];
  }else if(email !== USER_INFO.email || password !== USER_INFO.password){
    return [200, { messageErr: 'Invalid email or password', token: null}];
  }else{
    return [400, { messageErr: 'exception' }];
  }
  
});

export const login = async (email: string, password: string) => {
  try {
  const response = await api.post('/user1', { email, password });
  return response.data;
  } catch (error) {
    throw new Error('login Failed');
  }
};
*/

mock.onGet('/posts').reply(200, posts);

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};



export const fetchrecommend = async (bmi: number) => {
  try {
    const response = await api.post('/recommend', { bmi });
    return response.data;
    } catch (error) {
      throw new Error('Menu cannot find');
    }
};

mock.onPost('/recommend').reply((config) => {
  try {
  const { bmi } = JSON.parse(config.data);
  let filteredMenus = [];
  if (bmi < 18.5) {
    filteredMenus = menus.filter(menu => menu.calorie >= 300);
  } else if (bmi >= 18.5 && bmi < 25) {
    filteredMenus =  menus.filter(menu => menu.calorie >= 200 && menu.calorie < 300);
  } else {
    filteredMenus =  menus.filter(menu => menu.calorie < 200 && menu.protein >= 15);
  }
  return [200, filteredMenus];
  }catch (error) {
    throw new Error('Cannot find recommend menus');
  }
});
