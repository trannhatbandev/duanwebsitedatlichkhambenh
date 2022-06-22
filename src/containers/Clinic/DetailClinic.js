import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import 'slick-carousel/slick/slick-theme.css';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfor from '../Doctor/DoctorInfo';
import HomeHeader from '../HomePage/HomeHeader';
import BookingDoctor from '../Doctor/BookingDoctor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDetailClinicByIdServices } from '../../services/clinicServices';
import _ from 'lodash';

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrIdDoctor: [],
      detailClinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicByIdServices({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrIdDoctor = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrIdDoctor.push(item.doctorId);
            });
          }
        }

        this.setState({
          detailClinic: res.data,
          arrIdDoctor: arrIdDoctor,
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

      let res = await getDetailClinicByIdServices({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrIdDoctor = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrIdDoctor.push(item.doctorId);
            });
          }
        }
        this.setState({
          detailClinic: res.data,
          arrIdDoctor: arrIdDoctor,
        });
      }
    }
  };
  render() {
    let { arrIdDoctor, detailClinic } = this.state;
    let description = '';
    if (detailClinic && detailClinic.description) {
      description = `${detailClinic.description}`;
    }
    console.log('state', this.state);
    return (
      <div className="container">
        <HomeHeader />
        <div className="body">
          <div className="description">
            {detailClinic && !_.isEmpty(detailClinic) && (
              <div>
                <div>{detailClinic.name}</div>
                <div>
                  <ReactMarkdown
                    children={description}
                    remarkPlugins={[remarkGfm]}
                  />
                </div>
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
