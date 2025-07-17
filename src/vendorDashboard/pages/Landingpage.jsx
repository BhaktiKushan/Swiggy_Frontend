import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../forms/Login';
import Register from '../forms/Register';
import AddFirm from '../forms/AddFirm';
import AddProduct from '../forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const Landingpage = () => {
  const [showRegister, setshowRegister] = useState(true);
  const [showLogin, setshowLogin] = useState(false);
  const [showfirm, setshowFirm] = useState(false);
  const [showproduct, setshowProduct] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const resetAll = () => {
    setshowRegister(false);
    setshowLogin(false);
    setshowFirm(false);
    setshowProduct(false);
    setWelcome(false);
    setShowAllProducts(false);
  };

  const registerHandler = () => {
    resetAll();
    setshowRegister(true);
  };

  const loginHandler = () => {
    resetAll();
    setshowLogin(true);
  };

  const welcomeHandler = () => {
    resetAll();
    setWelcome(true);
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    resetAll();
    setshowRegister(true);
    setLoggedIn(false);
    localStorage.removeItem('LoginToken');
  };

  const showfirmHandler = () => {
    resetAll();
    setshowFirm(true);
  };

  const showproductHandler = () => {
    resetAll();
    setshowProduct(true);
  };

  const AllproductHandler = () => {
    resetAll();
    setShowAllProducts(true);
  };

  return (
    <>
      <Navbar
        registerHandler={registerHandler}
        loginHandler={loginHandler}
        logoutHandler={logoutHandler}
        loggedIn={loggedIn}
      />

      <div className={`main-layout ${loggedIn ? 'with-sidebar' : ''}`}>
        {loggedIn && (
          <Sidebar
            showfirmHandler={showfirmHandler}
            showproductHandler={showproductHandler}
            AllproductHandler={AllproductHandler}
          />
        )}

        <div className="main-content">
          {showRegister && <Register loginHandler={loginHandler} />}
          {showLogin && <Login welcomeHandler={welcomeHandler} />}
          {welcome && <Welcome />}
          {showfirm && <AddFirm showproductHandler={showproductHandler} />}
          {showproduct && <AddProduct />}
          {showAllProducts && <AllProducts />}
        </div>
      </div>
    </>
  );
};

export default Landingpage;
