import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingDoctor.scss';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getDoctorInfoBooking } from '../../services/doctorService';
class BookingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: [],
    };
  }
  async componentDidMount() {
    let data = await this.getDataInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
    }
  }
  getDataInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getDoctorInfoBooking(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  timeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.timeTypeData.valueVi;

      let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };
  render() {
    let { dataProfile } = this.state;
    let {
      dataTime,
      isShowDescriptionDoctor,
      isShowDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    let nameVi = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <div className="container">
        <div className="info-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ''
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{nameVi}</div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Blog &&
                    dataProfile.Blog.description && (
                      <span>{dataProfile.Blog.description}</span>
                    )}
                </>
              ) : (
                <>{this.timeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            Giá khám:
            {dataProfile && dataProfile.Doctor_Infor && (
              <NumberFormat
                className="currency"
                value={dataProfile.Doctor_Infor.priceData.valueVi}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'VNĐ'}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);
