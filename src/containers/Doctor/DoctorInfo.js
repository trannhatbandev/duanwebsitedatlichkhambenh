import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInfo.scss';
import NumberFormat from 'react-number-format';
import { getDoctorInfoService } from '../../services/doctorService';

class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      detailInfo: {},
    };
  }
  async componentDidMount() {
    if (this.props.doctorIdParent) {
      let res = await getDoctorInfoService(this.props.doctorIdParent);
      if (res && res.errCode === 0) {
        this.setState({
          detailInfo: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
      let res = await getDoctorInfoService(this.props.doctorIdParent);
      if (res && res.errCode === 0) {
        this.setState({
          detailInfo: res.data,
        });
      }
    }
  }
  handleOnChangeShowDetailPrice = (status) => {
    this.setState({
      isShowDetailPrice: status,
    });
  };
  render() {
    let { isShowDetailPrice, detailInfo } = this.state;

    return (
      <div className="doctor-info">
        <div className="content-up">
          <div className="text-address">Địa chỉ khám:</div>
          <div className="name-clinic">
            {detailInfo && detailInfo.nameClinic ? detailInfo.nameClinic : ''}
          </div>
          <div className="name-address">
            {' '}
            {detailInfo && detailInfo.addressClinic
              ? detailInfo.addressClinic
              : ''}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailPrice === false && (
            <div className="text-price-main">
              Giá khám:{' '}
              {detailInfo && detailInfo.priceData && (
                <NumberFormat
                  className="currency"
                  value={detailInfo.priceData.valueVi}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'VND'}
                />
              )}{' '}
              <span onClick={() => this.handleOnChangeShowDetailPrice(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailPrice === true && (
            <>
              {' '}
              <div className="text-price">GIÁ KHÁM:</div>
              <div className="price-info">
                <div className="detail-infor">
                  <span className="price-left">Giá khám</span>
                  <span className="price-right">
                    {' '}
                    {detailInfo && detailInfo.priceData && (
                      <NumberFormat
                        className="currency"
                        value={detailInfo.priceData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                      />
                    )}
                  </span>
                </div>
                <div className="note">
                  {' '}
                  {detailInfo && detailInfo.note ? detailInfo.note : ''}
                </div>
              </div>
              <div className="payment">
                Hình thức thanh toán:{' '}
                {detailInfo && detailInfo.paymentData
                  ? detailInfo.paymentData.valueVi
                  : ''}
              </div>
              <div
                className="table-price"
                onClick={() => this.handleOnChangeShowDetailPrice(false)}
              >
                <span>Ẩn bảng giá</span>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
