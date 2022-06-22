import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.userInfoHome,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfoHome !== this.props.userInfoHome) {
      this.setState({
        user: this.props.userInfoHome,
      });
    }
  }
  returnHome = () => {
    this.props.history.push('/home');
  };
  returnLogin = () => {
    this.props.history.push('/user-login');
  };
  logout = () => {
    this.props.processLogoutHome();
    this.props.history.push('/user-login');
  };
  historyBooking = () => {
    this.props.history.push('/history_booking');
  };
  render() {
    const { processLogoutHome, isLoggedInHome } = this.props;
    let { userInfoHome } = this.state;

    return (
      <React.Fragment>
        <div className="header-home-container">
          <div className="header-home-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Phòng khám</b>
                </div>
                <div className="sub-content">Phòng khám có bác sĩ làm việc</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Chuyên khoa</b>
                </div>
                <div className="sub-content">Chuyên khoa của bác sĩ</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="sub-content"> Bác sĩ website</div>
              </div>
            </div>
            <div className="right-content">
              {isLoggedInHome && isLoggedInHome === false ? (
                ''
              ) : (
                <div
                  className="header-register"
                  onClick={() => this.historyBooking()}
                >
                  Lịch sử khám bệnh
                </div>
              )}
              {userInfoHome !== null && userInfoHome ? (
                <div
                  className="header-login"
                  onClick={() => this.returnLogin()}
                >
                  Đăng nhập
                </div>
              ) : (
                <div className="header-login" onClick={() => this.logout()}>
                  Đăng xuất
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.isShow === true && (
          <div className="header-home-banner"></div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInHome: state.userHome.isLoggedInHome,
    userInfoHome: state.userHome.userInfoHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { processLogoutHome: () => dispatch(actions.processLogoutHome()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
