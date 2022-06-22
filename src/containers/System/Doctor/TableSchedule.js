import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './TableSchedule.scss';
import moment from 'moment';
import * as actions from '../../../store/actions';
import { getDataSchedule } from '../../../services/doctorService';

class TableSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
    };
  }

  async componentDidMount() {
    let doctorId = this.props.userInfo.id;
    this.props.readSchedule(doctorId);
    // let schedules = await this.getSchedule();
    // if (schedules && schedules.errCode === 0 && schedules.data) {
    //   this.setState({
    //     schedules: schedules.data,
    //   });
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.schedules !== this.props.schedules) {
      this.setState({
        schedules: this.props.schedules,
      });
    }
  }
  hadleDeleteSchedule = (schedule) => {
    this.props.deleteSchedule(schedule);
  };

  getSchedule = async () => {
    let doctorId = this.props.userInfo.id;
    let schedules = await getDataSchedule(doctorId);
    return schedules;
  };

  render() {
    let { schedules } = this.state;

    return (
      <React.Fragment>
        <table id="TableSchedule">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Ngày</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
            {schedules &&
              schedules.length > 0 &&
              schedules.map((item, index) => {
                let date = moment
                  .unix(+item.date / 1000)
                  .format('dddd - DD/MM/YYYY');
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{date}</td>
                    <td>{item.timeTypeData.valueVi}</td>
                    <td>
                      <button
                        className="delete-schedule"
                        onClick={() => this.hadleDeleteSchedule(item)}
                      >
                        <i className="fas fa-trash"></i>
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
    userInfo: state.user.userInfo,
    schedules: state.admin.schedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readSchedule: (doctorId) => dispatch(actions.readSchedule(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSchedule);
