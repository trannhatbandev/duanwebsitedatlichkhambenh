import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {
  getScheduleDoctorByDate,
  countScheduleDoctorByIdService,
} from '../../services/doctorService';
import * as actions from '../../store/actions';
import BookingModal from './Booking/BookingModal';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      avalableTime: [],
      isOpenBookingModal: false,
      dataScheduleTime: {},
    };
  }
  async componentDidMount() {
    // let doctorId = this.props.doctorIdParent;
    // await countScheduleDoctorByIdService(doctorId);
    let allDay = this.setArrDay();
    this.setState({
      allDay: allDay,
    });
    if (this.props.doctorIdParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdParent,
        allDay[0].value
      );
      this.setState({
        avalableTime: res.data ? res.data : [],
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
      let allDay = this.setArrDay();
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdParent,
        allDay[0].value
      );
      this.setState({
        avalableTime: res.data ? res.data : [],
      });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setArrDay = () => {
    let allDay = [];
    // let doctorId = this.props.doctorIdParent;
    // let res = await countScheduleDoctorByIdService(doctorId);
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (i === 0) {
        let formatddMM = moment(new Date()).format('DD/MM');
        let today = `Hôm nay - ${formatddMM}`;
        object.label = today;
      } else {
        let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
        object.label = this.capitalizeFirstLetter(labelVi);
      }

      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      allDay.push(object);
    }

    return allDay;
  };
  handleOnClickScheduleTime = (time) => {
    this.setState({
      isOpenBookingModal: true,
      dataScheduleTime: time,
    });
    console.log('time', time);
  };

  closeBooking = () => {
    this.setState({
      isOpenBookingModal: false,
    });
  };
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdParent && this.props.doctorIdParent !== -1) {
      let doctorId = this.props.doctorIdParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          avalableTime: res.data ? res.data : [],
        });
      }
    }
  };
  render() {
    let { allDay, avalableTime, isOpenBookingModal, dataScheduleTime } =
      this.state;
    console.log('allday', this.state);
    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDay &&
                allDay.length > 0 &&
                allDay.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám</span>
              </i>
            </div>
            <div className="time-content">
              {
                avalableTime && avalableTime.length > 0 && (
                  <>
                    <div className="time-content-schedule">
                      {avalableTime &&
                        avalableTime.map((item, index) => {
                          let timeDisPlay = item.timeTypeData.valueVi;
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                this.handleOnClickScheduleTime(item)
                              }
                            >
                              {timeDisPlay}
                            </button>
                          );
                        })}
                    </div>

                    <div className="free">
                      <span>
                        Vui lòng chọn lịch hẹn tại đây
                        <i className="far fa-hand-point-up"></i>
                      </span>
                    </div>
                  </>
                )
                // ) : (
                //   <div className="no-schedule">
                //     Không có lịch hẹn trong thời gian này vui lòng chọn lịch hẹn
                //     khác!
                //   </div>
                // )
              }
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenBookingModal}
          closeBooking={this.closeBooking}
          dataTime={dataScheduleTime}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countSchedule1: state.admin.countSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countScheduleRedux: (doctorId) =>
      dispatch(actions.countScheduleAction(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
