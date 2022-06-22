import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { handleLogin } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import './UserLogin.scss';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handlerUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handlerPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handlerShowPassord = () => {
    this.setState({
      statuspass: !this.state.statuspass,
    });
  };
  handlerUserLogin = async () => {
    let data = await handleLogin(this.state.username, this.state.password);
    console.log('data', data);
    if (data && data.errCode === 0 && data.user.roleId === 'R3') {
      this.props.userLoginHomeSuccess(data.user);
      this.props.history.push('/home');
    }
  };
  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handlerUserLogin();
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="UserLogin">
          <div className="container">
            <div className="content row ">
              <h1 className="col-12 text-center">Form Đăng nhập</h1>
              <div className="col-12 form-group input">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  value={this.state.username}
                  placeholder="Tên đăng nhập"
                  className="form-control"
                  onChange={(event) => this.handlerUserName(event)}
                />
              </div>
              <div className="col-12 form-group input">
                <label>Mật khẩu</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.statuspass ? 'text' : 'password'}
                    value={this.state.password}
                    placeholder="Mật khẩu"
                    className="form-control input-password"
                    onChange={(event) => this.handlerPassword(event)}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  <span onClick={() => this.handlerShowPassord()}>
                    <i
                      className={
                        this.state.statuspass
                          ? 'far fa-eye'
                          : 'far fa-eye-slash'
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: 'red' }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 input text-center">
                <button
                  className="btn-UserLogin"
                  onClick={() => this.handlerUserLogin()}
                >
                  Đăng nhập
                </button>
              </div>

              <div className="col-12 input text-center">
                <a>Quên mật khẩu?</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    userInfoHome: state.userHome.userInfoHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginHomeSuccess: (userInfoHome) =>
      dispatch(actions.userLoginHomeSuccess(userInfoHome)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserLogin)
);
