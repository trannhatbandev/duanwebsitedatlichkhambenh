import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageBooking.scss';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import {
  getBookingPatient,
  bookingPatientSuccess,
} from '../../../services/doctorService';
import moment from 'moment';
import { toast } from 'react-toastify';

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      data: {},
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { userInfo } = this.props;
    let { currentDate } = this.state;
    let fomatDate = new Date(currentDate).getTime();

    let res = await getBookingPatient({
      doctorId: userInfo.id,
      date: fomatDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  confirmBookingSuccess = async (item) => {
    let time = item.timeTypeDataPatient.valueVi;
    let date = moment.unix(+item.date / 1000).format('dddd - DD/MM/YYYY');
    let data = {
      email: item.patientData.email,
      doctorId: item.doctorId,
      patientId: item.patientId,
      patientName: `${item.patientData.lastName} ${item.patientData.firstName}`,
      timeType: item.timeType,
      time: `${time} - ${date}`,
    };
    let res = await bookingPatientSuccess(data);
    console.log('res', res);
    if (res && res.errCode === 0) {
      toast.success('Gửi email thành công');
      await this.getDataPatient();
    } else {
      toast.error('Gửi email không thành công');
      console.log('error', res);
    }
  };
  render() {
    let { dataPatient } = this.state;
    console.log('data', dataPatient);
    return (
      <React.Fragment>
        <div className="manage-booking-container">
          <div className="manage-booking-title">Quản lý kế hoạch khám bệnh</div>
          <div className="body row">
            <div className="col-4 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 table-manage-booking">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    {' '}
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th>Số điện thoại</th>
                    <th>Actions</th>
                  </tr>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.timeTypeDataPatient.valueVi}</td>
                          <td>{`${item.patientData.lastName} ${item.patientData.firstName}`}</td>
                          <td>{item.patientData.address}</td>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.genderData.valueVi}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>
                            <button
                              className="btn-confirm"
                              onClick={() => this.confirmBookingSuccess(item)}
                            >
                              Xác nhận khám xong
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>Không có dữ liệu</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    getAllCodeSchedule: () => dispatch(actions.getAllCodeSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
