import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import BookingDoctor from '../BookingDoctor';
import { registerPatientServices } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import moment from 'moment';
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fullName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      birthday: '',
      selectGender: '',
      doctorId: '',
      gender: '',
      timeType: '',
      password: '',
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.gender !== prevProps.gender) {
      this.setState({
        gender: this.builDataGender(this.props.gender),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        console.log('doctorId', doctorId);
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  builDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = item.valueVi;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  handleOnChangeInput = (event, id) => {
    let input = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = input;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleOnChangeSelect = (selectOption) => {
    this.setState({ selectGender: selectOption });
  };
  handleRegisterPatientBooking = async () => {
    let date = new Date(this.state.birthday).getTime(); //chuyển dữ liệu về timstamp
    let time = this.buildDataTimeBooking(this.props.dataTime);
    let doctorName = this.buildDataDoctorName(this.props.dataTime);
    let res = await registerPatientServices({
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      email: this.state.email,
      address: this.state.address,
      date: this.props.dataTime.date,
      birthday: date,
      selectGender: this.state.selectGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      time: time,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success('Đặt lịch thành công');
      this.props.closeBooking();
    } else {
      toast.error('Đặt lịch không thành công');
    }
  };
  buildDataTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.timeTypeData.valueVi;
      let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
      return `${time} - ${date}`;
    }
  };
  buildDataDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

      return name;
    }
    return '';
  };
  render() {
    console.log('state', this.state);
    console.log('prop', this.props);
    let { isOpenModal, closeBooking, dataTime } = this.props;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <Modal
        isOpen={isOpenModal}
        className={'booking-modal-container'}
        size="lg"
        centered
      >
        <div className="content">
          <div className="header">
            <span className="left">
              <span className="right" onClick={closeBooking}>
                <i className="fas fa-times"></i>
              </span>
            </span>
          </div>
          <div className="body">
            <div className="doctor-infor">
              <BookingDoctor
                doctorId={doctorId}
                dataTime={dataTime}
                isShowDescriptionDoctor={false}
                isShowDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="price"></div>
            <div className="row">
              <div className="col-3 form-group">
                <label>Họ</label>
                <input
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'lastName')
                  }
                />
              </div>
              <div className="col-3 form-group">
                <label>Tên</label>
                <input
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'firstName')
                  }
                />
              </div>
              <div className="col-3 form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'password')
                  }
                />
              </div>
              <div className="col-3 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'phoneNumber')
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, 'address')
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Ngày sinh</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.birthday}
                />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <Select
                  value={this.state.selectGender}
                  onChange={this.handleOnChangeSelect}
                  options={this.state.gender}
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleRegisterPatientBooking()}
            >
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeBooking}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { gender: state.admin.gender };
};

const mapDispatchToProps = (dispatch) => {
  return { getGenderStart: () => dispatch(actions.fetchGenderStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
