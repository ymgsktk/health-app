import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/redux_store';
import axios from 'axios';
import Adapter from 'axios-mock-adapter'
import { useNavigate } from 'react-router-dom';
import { PATH_URL, USER_INFO_DUM, userInfoDefault } from "../../utils/constant";
import './login.css';
import { login } from '../../API/apidata';

const mock = new Adapter(axios);

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: AppState) => state.user);

  const handleLogin = async () => {
    try {
      const response = await login(userInfo.email, userInfo.password);

      if(response && response.token){
        alert(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      }else{
        alert(response.messageErr)
      }
      console.log('Login response:', response);  // レスポンスをログに出力
      
     
    } catch (error) {
      console.error('Login error:', error);
     //alert('Invalid email or password!!');
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="login-title">ログイン</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => dispatch({ type: 'SET_USER_INFO', payload: { email: e.target.value, password: userInfo.password } })}
            placeholder="Emailを入力"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            onChange={(e) => dispatch({ type: 'SET_USER_INFO', payload: { email: userInfo.email, password: e.target.value } })}
            placeholder="パスワードを入力"
            required
          />
        </div>

        <button className="login-button" onClick={handleLogin}>ログイン</button>

        <div className="register-link">
          アカウントを持っていない方 <a href="/register">アカウント登録</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

