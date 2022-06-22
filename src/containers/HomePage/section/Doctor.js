import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDoctor: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctor !== this.props.doctor) {
      this.setState({
        arrayDoctor: this.props.doctor,
      });
    }
  }
  componentDidMount() {
    this.props.loadDoctors();
  }
  handleDetailDoctor(data) {
    this.props.history.push(`/detail-doctor/${data.id}`);
  }
  render() {
    let arrayDoctor = this.state.arrayDoctor;

    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-doctor">
        <div className="doctor-container">
          <div className="doctor-header">
            <span className="title-header">Bác sĩ</span>
            <button className="btn-header">Xem thêm</button>
          </div>
          <div className="doctor-body">
            <Slider {...settings}>
              {arrayDoctor &&
                arrayDoctor.length > 0 &&
                arrayDoctor.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString(
                      'binary'
                    );
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName} `;
                  return (
                    <div
                      className="img-custom"
                      onClick={() => this.handleDetailDoctor(item)}
                    >
                      <div>
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        ></div>
                      </div>

                      <div className="position text-center">
                        <div>{nameVi}</div>
                        <div>Cơ xương khớp</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    doctor: state.admin.doctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDoctors: () => dispatch(actions.getDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
