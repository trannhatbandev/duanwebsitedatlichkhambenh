import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './HistoryBookingPatient.scss';
import moment from 'moment';
import { toast } from 'react-toastify';
import HomeHeader from '../HomePage/HomeHeader';
import {
  getHistoryBooking,
  updateHistoryBooking,
} from '../../services/userService';

class HistoryBookingPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      user: [],
    };
  }

  async componentDidMount() {
    let patientId = this.state.user.id;

    let res = await getHistoryBooking(patientId);

    if (res.data && res.errCode === 0) {
      this.setState({
        booking: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfoHome !== this.props.userInfoHome) {
      let patientId = this.props.userInfoHome.id;

      let res = await getHistoryBooking(patientId);

      if (res.data && res.errCode === 0) {
        this.setState({
          user: this.props.userInfoHome,
          booking: res.data ? res.data : [],
        });
      }
    }
  }

  cancelBooking = async (booking) => {
    let formatDate = moment
      .unix(+booking.date / 1000)
      .format('dddd - DD/MM/YYYY');
    let res = await updateHistoryBooking({
      email: booking.patientData.email,
      firstName: booking.patientData.firstName,
      lastName: booking.patientData.lastName,
      patientId: booking.patientId,
      dateformat: formatDate,
      date: booking.date,
      time: booking.timeTypeDataPatient.valueVi,
      timeType: booking.timeType,
    });
    if (res && res.errCode === 0) {
      toast.success('Hủy lịch thành công');
      let patientId = this.state.user.id;

      let res = await getHistoryBooking(patientId);

      if (res.data && res.errCode === 0) {
        this.setState({
          booking: res.data ? res.data : [],
        });
      }
    } else {
      toast.error('Hủy lịch không thành công');
    }
  };

  render() {
    let { booking } = this.state;
    let { userInfoHome } = this.props;
    console.log('booking', booking);
    return (
      <React.Fragment>
        <HomeHeader />
        <table id="HistoryBookingPatient">
          <tbody>
            <tr>
              <th>Ngày</th>
              <th>Thời gian</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {booking &&
              booking.length > 0 &&
              booking.map((item, index) => {
                let date = moment
                  .unix(+item.date / 1000)
                  .format('dddd - DD/MM/YYYY');
                return (
                  <tr key={index}>
                    <td>{date}</td>
                    <td>{item.timeTypeDataPatient.valueVi}</td>
                    <td>{item.patientData.email}</td>
                    <td>{item.patientData.address}</td>
                    <td>
                      {item.statusId === 'S2'
                        ? 'Đã xác nhận'
                        : item.statusId === 'S3'
                        ? 'Đã khám xong'
                        : 'Đã hủy'}
                    </td>
                    <td>
                      <button
                        className="update-user"
                        onClick={() => this.cancelBooking(item)}
                      >
                        {item.statusId === 'S2' ? 'Hủy lịch khám' : 'OK'}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoHome: state.userHome.userInfoHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryBookingPatient);
