import React from 'react';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import Blog from "../pages/blog/blog";
import BodyIndex from "../pages/body-index/body-index"
import CalorieIndex from "../pages/calorie-index/calorie-index"
import CalorieCalculation from "../pages/calorie-calculation/calorie-calculation"
import Dashboard from "../pages/dashboard/dashboard"
import User from "../pages/user/user"

import { isAuthenticated } from "./helpers";
import Protected from "./protected";
import { PATH_URL } from "../utils/constant";
import Login from "../pages/login/login";
  
const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
  
        <Route element={<Protected />}>
          {/* All other routes that you want to protect will go inside here */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/body-index" element={<BodyIndex />} />
          <Route path="/calorie-index" element={<CalorieIndex />} />
          <Route path="/calorie-calculation" element={<CalorieCalculation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Route>
  
        <Route
          path={PATH_URL.signIn}
          element={<Login/>}
          loader={async () => await isAuthenticated()}
        />
        
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    )
  );
  
  const AppRouter = () => {
    return <RouterProvider router={router} />;
  };
  
  export default AppRouter;