import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import axios from 'axios';
import Adapter from 'axios-mock-adapter';
import { useNavigate } from 'react-router-dom';
import { PATH_URL, USER_INFO_DUM, userInfoDefault } from "../../utils/constant";
import './login.css';
import { login } from '../../API/api-back';

//const mock = new Adapter(axios);

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: AppState) => state.user);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(userInfo.username, userInfo.password)
      const response = await login(userInfo.username, userInfo.password);
      console.log("bbb",response);

      if(response.access){
        alert(response.message);
        //localStorage.setItem('token', response.access);
        navigate('/blog');
    } else {
        console.log("aaaa",response);
    }
      console.log('Login response:', response);  // Log the response for debugging
      
    } catch (error) {
      console.error('Login error:', error);
      alert('ログインエラー');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">ログイン</h2>
        
        <div className="form-group">
          <label htmlFor="username">ユーザーネーム</label>
          <input
            type="text"
            id="username"
            onChange={(e) => dispatch({ type: 'SET_USER_INFO', payload: { username: e.target.value, password: userInfo.password } })}
            placeholder="ユーザーネームを入力"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            onChange={(e) => dispatch({ type: 'SET_USER_INFO', payload: { username: userInfo.username, password: e.target.value } })}
            placeholder="パスワードを入力"
            required
          />
        </div>

        <button className="login-button" type='submit'>ログイン</button>

        <div className="register-link">
          アカウントを持っていない方 <a href="/register">アカウント登録</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
