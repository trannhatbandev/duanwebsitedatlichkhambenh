import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './section/Specialty';
import Clinic from './section/Clinic';
import Doctor from './section/Doctor';
import About from './section/About';
import Footer from './section/Footer';
import './HomePage.scss';

class HomePage extends Component {
  render() {
    console.log('user', this.props);
    return (
      <div>
        {' '}
        <HomeHeader isShow={true} />
        <Specialty />
        <Clinic />
        <Doctor />
        <About />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfoHome: state.user.userInfoHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
