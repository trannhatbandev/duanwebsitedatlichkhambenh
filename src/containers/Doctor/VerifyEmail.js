import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import HomeHeader from '../HomePage/HomeHeader';
import { verifyBookingEmailServices } from '../../services/userService';

import * as actions from '../../store/actions';
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');
      let res = await verifyBookingEmailServices({
        token: token,
        doctorId: doctorId,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
    }
  }
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <React.Fragment>
        <HomeHeader />
        <div className="container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="booking-content">
                  Xác nhận lịch hẹn thành công
                </div>
              ) : (
                <div className="booking-content">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
