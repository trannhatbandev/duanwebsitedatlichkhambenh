import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HistoryBooking.scss';
import moment from 'moment';
import { getHistoryBooking } from '../../../services/doctorService';

class HistoryBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      doctor: [],
    };
  }

  async componentDidMount() {
    let doctorId = this.props.userInfo.id;
    let res = await getHistoryBooking(doctorId);
    if (res.data && res.errCode === 0) {
      this.setState({
        booking: res.data ? res.data : [],
        doctor: res.dataDoctor ? res.dataDoctor : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { booking, doctor } = this.state;
    console.log('booking', this.state);
    return (
      <React.Fragment>
        <h1 className="text-center pt-3">Lịch sử khám bệnh</h1>
        <table id="HistoryBooking">
          <tbody>
            <tr>
              <th>Bệnh nhân được khám</th>
              <th>Email bệnh nhân</th>
              <th>Số điện thoại</th>
              <th>Ngày khám</th>
              <th>Giờ khám</th>
              <th>Giá khám</th>
              <th>Hình thức thanh toán</th>
              <th>Trạng thái</th>
            </tr>
            {booking &&
              booking.length > 0 &&
              booking.map((item, index) => {
                let date = moment
                  .unix(+item.date / 1000)
                  .format('dddd - DD/MM/YYYY');
                return (
                  <tr key={index}>
                    <td>{`${item.patientData.lastName} ${item.patientData.firstName}`}</td>
                    <td>{item.patientData.email}</td>
                    <td>{item.patientData.phoneNumber}</td>
                    <td>{date}</td>
                    <td>{item.timeTypeDataPatient.valueVi}</td>
                    <td>{doctor[0].priceData.valueVi}VNĐ</td>
                    <td>{doctor[0].paymentData.valueVi}</td>
                    <td>
                      {item.statusId === 'S3' ? 'Đã khám xong' : 'Đã hủy'}
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
  return { userInfo: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBooking);
