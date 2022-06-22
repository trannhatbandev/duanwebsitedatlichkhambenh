import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Specialty.scss';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import { getSpecialtyServices } from '../../../services/specialtyService';
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    let response = await getSpecialtyServices();
    if (response && response.errCode === 0) {
      this.setState({
        data: response.data ? response.data : [],
      });
    }
  }
  handleDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  async componentDidUpdate() {}
  render() {
    let { data } = this.state;

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-header">Chuyên khoa</span>
            <button className="btn-header">Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              {data &&
                data.length > 0 &&
                data.map((item, index) => {
                  return (
                    <div
                      className="img-custom"
                      key={index}
                      onClick={() => this.handleDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="specialty-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
