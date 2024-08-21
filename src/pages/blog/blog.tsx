import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../API/apidata'; 
import { useDispatch, useSelector } from 'react-redux';
import './blog.css';
import MainLayout from "../mainlayout";
import { AppState } from '../../store/redux_store';
import { Post } from '../../interface/post';
import { toggleMenu } from '../../store/redux_postReducer';

const handleToggle = (menu: string, dispatch: any) => {
  dispatch(toggleMenu(menu));
};

const Home: React.FC = () => {

  const dispatch = useDispatch();
  const posts = useSelector((state: AppState) => state.posts.posts);
  const menuState = useSelector((state: AppState) => state.menu);


  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        dispatch({ type: 'SET_POSTS', payload: postsData });
        console.log('postdata is',postsData)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [dispatch]);
  
  return (
    <MainLayout>
      <div className="container">
        <div className="side-menu">
          <ul>
            <li onClick={() => handleToggle('menu1', dispatch)}>
              季節別<span className="menu-icon">＞</span> 
              {menuState.menu1 && (
                <ul>
                  <li>春</li>
                  <li>夏</li>
                  <li>秋</li>
                  <li>冬</li>
                </ul>
              )}
            </li>
            <li onClick={() => handleToggle('menu2', dispatch)}>
              時間別<span className="menu-icon">＞</span> 
              {menuState.menu2 && (
                <ul>
                  <li>朝</li>
                  <li>昼</li>
                  <li>夜</li>
                </ul>
              )}
            </li>
            <li onClick={() => handleToggle('menu2', dispatch)}>
              曜日別<span className="menu-icon">＞</span> 
              {menuState.menu2 && (
                <ul>
                  <li>月曜日</li>
                  <li>火曜日</li>
                  <li>水曜日</li>
                  <li>木曜日</li>
                  <li>金曜日</li>
                  <li>土曜日</li>
                  <li>日曜日</li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      <div>
        <h1 className='menu-title'>メニュー</h1>
        <div className="posts-wrapper">
          {posts.map((post) => (
            <div key={post.id} className="post-container">
              <div className="post-container-child">
                <div className="user">
                  <div className="icon-title">
                    <img src={post.iconUrl} className="icon-image" />
                    <div className="title-des">
                      <h3 className="post-title">{post.title}</h3>
                    </div>
                    <div className='post-date'>{post.date}</div>
                  </div>
                  <p className="post-description">{post.description}</p>
                </div>
                <div className='img-des'>
                  <img src={post.imageUrl} alt={post.title} className="post-image" />
                  <p className="post-teamdescription">{post.teamdescription}</p>
                </div>
              </div>
            <div className="post-interactions">
              <span>☆{post.likes}</span>
              <span>♡{post.likes}</span>
              <span>💬{post.comments}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    </MainLayout>)
}

export default Home;
