import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './About.scss';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit';

class About extends Component {
  render() {
    return (
      <MDBFooter className="text-center" color="white" bgColor="primary">
        <MDBContainer className="p-4">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </a>
          </section>

          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Liên hệ với chúng tôi</strong>
                  </p>
                </div>

                <MDBCol md="5" start="12">
                  <MDBInput
                    contrast
                    type="email"
                    label="Email address"
                    className="mb-4"
                  />
                </MDBCol>

                <div className="col-auto">
                  <MDBBtn outline color="light" type="submit" className="mb-4">
                    Gửi
                  </MDBBtn>
                </div>
              </div>
            </form>
          </section>

          <section className="mb-4">
            <p>
              Chúng tôi luôn cung cấp dịch vụ tốt nhất cho bạn, với những thành
              quả đạt được trong những năm qua
            </p>
          </section>

          <section className="">
            <MDBRow>
              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Về chúng tôi</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Thông tin
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Chính sách và điều khoản
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Đội ngũ thành viên
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Dự định
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Phòng khám</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Hồ Chí Minh
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Hà Nội
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Đà Nẵng
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Cần Thơ
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Thành tựu</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Năm 2022
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Năm 2021
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Năm 2020
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Năm 2019
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Liên hệ</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Email: trannhatban34@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Số điện thoại: 036564789
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Địa chỉ: TPHCM
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Twitter: healthy@gmail.com
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </MDBFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
