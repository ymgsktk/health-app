import React, { ReactNode } from 'react';
import Header from "../components/header";

interface MainLayoutProps {
    children: ReactNode;
  }

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;