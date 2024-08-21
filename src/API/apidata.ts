import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const mock = new MockAdapter(api);

const USER_INFO = {
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6IjM1ZmI5OTgyM2YzNWJhMDU4ZDM2MDYxNmMxMmQ0NTViN2U1NDhjZWFlOGJlMjJkYTRhMjNlMDRiMTdhZTJkYTcyZGI2YThlYTVmYmFlNTUzIiwiaWF0IjoxNzIzNjI4OTQxLCJuYmYiOjE3MjM2Mjg5NDEsImV4cCI6MTc1NTE2NDk0MSwic3ViIjoiMTgzNzYxIiwic2NvcGVzIjpbXX0.OD0-b8Uz8uFpbadgFpR-Edac_l7IeJ41JH8wf8H8q5tjkJJrWEjnEIR7hNUMtjmgszYNzlLDtIFBb1pHsHDn6PPrtFYg4ioioAqmPlVjIV8WYUV7TjSLaxcSohO4rudbTMbmT7-gDz61Xtz9_HdCWOmMOuBq65FEux-e3PS6-XLDl0hAAjBp-11G8jUoEdnyrCXD6hux56bR_wFX0KeaDsAtUE_oXIA2AN1pJ4ZNO9aJmMdi7_xT3hA4RNrSmUnmBY7-U-tESZG6A19ZftYVxteEZDHdgaPe3wTyUYZlADpcrzMt6KfMJ_WjZvgshElZTYh2vyxTVlmpcNmg__QRuQwlfG96Q_2D7NF8nppiwm7uQT3ma6UDnD0_EW2skA8qWEaIyWCwNlRsNyHGbqeB5nW-XD9jrIUyf7fHkzBEw_-qFFXQmFuEy5VKalDs-sZZEmn53UdoUTf9MpITtgtUkkftVCi0vK3J3i0oLvS_7lTFbvfNdL0GanQhj_xoOeRYH_CO1UOzP_GhpdyqTCoOZIHhRTCDiNXzndgQmj7hI_uHBHsuDLE3P58-0rgUJp_QaNUmIpwYu2ycTWBsCjbWarYh0XfP_XFPzjRt1K6AgWzaeJYTdqQd4xErY3ELSShRiy-lXO4rV3gljEg6ZZ8jwU9VPPnGg17f1J7t5tNoYtk",
  email: "yamagishi@rikkeisoft.com",
  password: "12345678"
};

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


const posts = [
  {
    id: 1,
    title: "Yamagishi Katsuki",
    teamdescription: "Ant Design, a design language for backgraound applications, is refined by AntUED Team.",
    description: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    imageUrl: "https://user0514.cdnw.net/shared/img/thumb/kumaki20960400619_TP_V.jpg",
    iconUrl: "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png",
    star: 156,
    likes: 156,
    comments: 2,
  },
  {
    id: 2,
    title: "ant design part 10",
    teamdescription: "Ant Design, a design language for backgraound applications, is refined by AntUED Team.",
    description: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    imageUrl: "https://user0514.cdnw.net/shared/img/thumb/kumaki20960400619_TP_V.jpg",
    iconUrl: "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_2.png",
    star: 156,
    likes: 156,
    comments: 2,
  },
  {
    id: 3,
    title: "ant design part 11",
    teamdescription: "Ant Design, a design language for backgraound applications, is refined by AntUED Team.",
    description: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    imageUrl: "https://user0514.cdnw.net/shared/img/thumb/kumaki20960400619_TP_V.jpg",
    iconUrl: "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_3.png",
    star: 156,
    likes: 156,
    comments: 2,
  }
];

mock.onGet('/posts').reply(200, posts);

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};