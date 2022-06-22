import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './ManageHistoryBooking.scss';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import moment from 'moment';
import { getHistoryBookingAdmin } from '../../../services/doctorService';

class ManageHistoryBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      selectedDoctor: '',
      listdoctor: [],
      dataHistoryBooking: [],
      dataDoctor: [],
    };
  }

  async componentDidMount() {
    this.props.getAllDoctor();
    await this.getDataHistoryBooking();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alldoctor !== this.props.alldoctor) {
      let dataselect = this.builDtaSelect(this.props.alldoctor, 'USERS');
      this.setState({
        listdoctor: dataselect,
      });
    }
  }
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataHistoryBooking();
      }
    );
  };

  getDataHistoryBooking = async () => {
    let { currentDate } = this.state;
    let fomatDate = new Date(currentDate).getTime();
    let doctorId = this.state.selectedDoctor.value;
    let date = fomatDate;
    let res = await getHistoryBookingAdmin(doctorId, date);
    if (res && res.errCode === 0) {
      this.setState({
        dataHistoryBooking: res.data,
        dataDoctor: res.dataDoctor,
      });
    }
  };
  builDtaSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      if (type === 'USERS') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.lastName} ${item.firstName}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }

    return result;
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  render() {
    let { dataHistoryBooking, dataDoctor } = this.state;
    return (
      <React.Fragment>
        <div className="mange-doctor-container">
          <div className="manage-doctor-title">
            Xem lịch sử khám của bệnh nhân
          </div>
          <div className="manage-doctor-info">
            <div className="content-left ">
              <label>Chọn bác sĩ:</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listdoctor}
                placeholder={'Chọn bác sĩ'}
              />
            </div>
            <div className="content-right form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <table id="TableUser">
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
                <th>Tổng tiền</th>
              </tr>
              {dataHistoryBooking &&
                dataHistoryBooking.length > 0 &&
                dataHistoryBooking.map((item, index) => {
                  let date = moment
                    .unix(+item.date / 1000)
                    .format('dddd - DD/MM/YYYY');
                  let dem = 0;
                  if (item.statusId === 'S3') {
                    dem++;
                  }
                  let price = dataDoctor[0].priceData.valueVi;
                  let total = dem * price;
                  return (
                    <tr key={index}>
                      <td>{`${item.patientData.lastName} ${item.patientData.firstName}`}</td>
                      <td>{item.patientData.email}</td>
                      <td>{item.patientData.phoneNumber}</td>
                      <td>{date}</td>
                      <td>{item.timeTypeDataPatient.valueVi}</td>
                      <td>{dataDoctor[0].priceData.valueVi}VNĐ</td>
                      <td>{dataDoctor[0].paymentData.valueVi}</td>
                      <td>
                        {item.statusId === 'S3' ? 'Đã khám xong' : 'Đã hủy'}
                      </td>
                      <td rowSpan={dataHistoryBooking.length}>
                        {item.statusId === 'S3' ? total : 0}
                        VNĐ
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alldoctor: state.admin.alldoctor,
    allInfoDataDoctor: state.admin.allInfoDataDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    getInforDoctorAction: () => dispatch(actions.getInforDoctorAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageHistoryBooking);
