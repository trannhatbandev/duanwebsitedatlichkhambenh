import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      statuspass: false,
      errMessage: '',
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
  handlerLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log('login success');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handlerLogin();
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="login">
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
                  className="btn-login"
                  onClick={() => this.handlerLogin()}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
