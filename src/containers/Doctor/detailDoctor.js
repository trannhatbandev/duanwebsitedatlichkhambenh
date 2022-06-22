import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../containers/HomePage/HomeHeader';
import './DetailDoctor.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDetailDoctorService } from '../../services/doctorService';
import DoctorSchedule from './DoctorSchedule';
import DoctorInfo from './DoctorInfo';
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctor: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctor: id,
      });
      let res = await getDetailDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailDoctor } = this.state;
    console.log('detaitdoctor', detailDoctor);
    let nameVi = '';
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName} `;
    }
    let markdown = '';
    if (
      detailDoctor &&
      detailDoctor.Blog &&
      detailDoctor.Blog.contentMarkdown
    ) {
      markdown = `${detailDoctor.Blog.contentMarkdown}`;
    }

    return (
      <div>
        <HomeHeader isShow={false} />
        <div className="doctor-detail-container">
          <div className="first-info-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ''
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="name-position">{nameVi}</div>
              <div className="description">
                {detailDoctor.Blog && detailDoctor.Blog.description && (
                  <span>{detailDoctor.Blog.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="schedule-doctor-left">
              <DoctorSchedule doctorIdParent={this.state.currentDoctor} />
            </div>
            <div className="schedule-doctor-right">
              <DoctorInfo doctorIdParent={this.state.currentDoctor} />
            </div>
          </div>
          <div className="detail-info-doctor">
            <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
