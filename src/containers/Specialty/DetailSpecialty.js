import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import 'slick-carousel/slick/slick-theme.css';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfor from '../Doctor/DoctorInfo';
import HomeHeader from '../HomePage/HomeHeader';
import BookingDoctor from '../Doctor/BookingDoctor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDetailSpecialtyByIdServices } from '../../services/specialtyService';
import _ from 'lodash';
import { getType } from '../../services/allcodeService';
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrIdDoctor: [],
      detailSpecialty: {},
      listProvince: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyByIdServices({
        id: id,
        location: 'ALL',
      });
      let response = await getType('PROVINCE');
      if (res && res.errCode === 0 && response && response.errCode === 0) {
        let data = res.data;
        let arrIdDoctor = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrIdDoctor.push(item.doctorId);
            });
          }
        }
        let dataProvince = response.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: 'ALL',
            type: 'PROVINCE',
            valueVi: 'Toàn quốc',
          });
        }
        this.setState({
          detailSpecialty: res.data,
          arrIdDoctor: arrIdDoctor,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getDetailSpecialtyByIdServices({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrIdDoctor = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrIdDoctor.push(item.doctorId);
            });
          }
        }
        this.setState({
          detailSpecialty: res.data,
          arrIdDoctor: arrIdDoctor,
        });
      }
    }
  };
  render() {
    let { arrIdDoctor, detailSpecialty, listProvince } = this.state;
    let description = '';
    if (detailSpecialty && detailSpecialty.description) {
      description = `${detailSpecialty.description}`;
    }
    console.log('state', this.state);
    return (
      <div className="container">
        <HomeHeader />
        <div className="body">
          <div className="description">
            {detailSpecialty && !_.isEmpty(detailSpecialty) && (
              <div>
                <ReactMarkdown
                  children={description}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrIdDoctor &&
            arrIdDoctor.length > 0 &&
            arrIdDoctor.map((item, index) => {
              return (
                <div className="doctor" key={index}>
                  <div className="content-left">
                    <div className="profile-doctor">
                      <BookingDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdParent={item} />
                    </div>
                    <div className="doctor-infor">
                      <DoctorInfor doctorIdParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
