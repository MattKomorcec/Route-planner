import React, { Component } from 'react';
import Header from './Components/HeaderComponent/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import MapComponent from './Components/MapComponent/MapComponent';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <Header />
        
        <div className="main-content-holder">
          <Sidebar />
          <MapComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gettingUserInfo: state.User.gettingUserInfo,
    userInfo: state.User.userInfo,
    userInfoError: state.User.userInfoError
  }
}

export default connect(mapStateToProps)(App);
