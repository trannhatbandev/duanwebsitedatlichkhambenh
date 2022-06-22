import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className="section-footer">
        <p>&copy; 2022 Trần Nhật Bản - Lê Văn Hiếu</p>
        <span>Bạn muốn biết thêm thông tin: </span>
        <a target="blank" href=" https://www.facebook.com/n.ban.tran">
          Click me
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
