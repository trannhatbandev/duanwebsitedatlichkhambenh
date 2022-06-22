import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';
import {
  bulkCreateSchedule,
  getDataSchedule,
} from '../../../services/doctorService';
import TableSchedule from './TableSchedule';
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listdoctor: [],
      oldData: false,
      selectedDoctor: {},
      currentDate: '',
      rangeTime: '',
      schedules: [],
    };
  }

  async componentDidMount() {
    this.props.getAllDoctor();
    this.props.getAllCodeSchedule();
    this.props.readSchedule(this.props.userInfo.id);
    let schedules = await this.getSchedule();
    if (schedules && schedules.errCode === 0 && schedules.data) {
      this.setState({
        schedules: schedules.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alldoctor !== this.props.alldoctor) {
      let dataselect = this.builDtaSelect(this.props.alldoctor);
      this.setState({
        listdoctor: dataselect,
      });
    }
    if (prevProps.time !== this.props.time) {
      let data = this.props.time;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  builDtaSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let label = `${item.lastName} ${item.firstName}`;
        object.label = label;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleRangeTime = () => {
    let { rangeTime } = this.state;
    let date1 = new Date();
    let hour = date1.getHours();
    let result = [];
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item, index) => {
        if (item.valueVi.slice(0, 2) > hour) {
          let value = rangeTime[index];

          result.push(value);
        }
      });
    }
    return result;
  };

  handleClickTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error('Thiếu ngày');
      return;
    }
    // if (selectedDoctor && _.isEmpty(selectedDoctor)) {
    //   toast.error('Thiếu bác sĩ');
    //   return;
    // }
    let fomatDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectTime && selectTime.length > 0) {
        selectTime.map((schedule, index) => {
          let object = {};
          object.doctorId = this.props.userInfo.id;
          object.date = fomatDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
        this.props.readSchedule(this.props.userInfo.id);
        toast.success('Thêm kế hoạch khám thành công');
      } else {
        toast.error('Chưa chọn');
        return;
      }
    }
    let res = await bulkCreateSchedule({
      arrSchedule: result,
      doctorId: this.props.userInfo.id,
      fomatDate: fomatDate,
    });
    this.props.readSchedule(this.props.userInfo.id);
  };
  getSchedule = async () => {
    let doctorId = this.props.userInfo.id;
    let schedules = await getDataSchedule(doctorId);
    return schedules;
  };
  deleteSchedule = async (data) => {
    this.props.deleteSchedule(data);
  };

  render() {
    let { rangeTime } = this.state;
    let { currentDate } = this.state;
    let arrPushRangeTime = this.handleRangeTime();
    let datePicker = new Date(currentDate).toLocaleDateString();
    let datenow = new Date().toLocaleDateString();

    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="manage-schedule-title">
            Quản lý kế hoạch khám bệnh
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Chọn ngày</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 hour-container">
                {datePicker === datenow
                  ? arrPushRangeTime &&
                    arrPushRangeTime.length > 0 &&
                    arrPushRangeTime.map((item, index) => {
                      return (
                        <button
                          className={
                            item.isSelected === true
                              ? 'btn-schedule active'
                              : 'btn-schedule'
                          }
                          key={index}
                          onClick={() => this.handleClickTime(item)}
                        >
                          {item.valueVi}
                        </button>
                      );
                    })
                  : rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return (
                        <button
                          className={
                            item.isSelected === true
                              ? 'btn-schedule active'
                              : 'btn-schedule'
                          }
                          key={index}
                          onClick={() => this.handleClickTime(item)}
                        >
                          {item.valueVi}
                        </button>
                      );
                    })}
              </div>
              <div className="col-12">
                {' '}
                <button
                  className="btn btn-primary btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  Tạo kế hoạch
                </button>
              </div>
            </div>
          </div>
        </div>

        <TableSchedule
          handleEditSchedule={this.handleEditSchedule}
          deleteSchedule={this.deleteSchedule}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
    alldoctor: state.admin.alldoctor,
    time: state.admin.time,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    getAllCodeSchedule: () => dispatch(actions.getAllCodeSchedule()),
    deleteSchedule: (data) => dispatch(actions.deleteSchedule(data)),
    readSchedule: (doctorId) => dispatch(actions.readSchedule(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
