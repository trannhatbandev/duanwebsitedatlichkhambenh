import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import { crudActions } from '../../../utils';
import MDEditor from '@uiw/react-md-editor';
import Select from 'react-select';
import { getDetailDoctorService } from '../../../services/doctorService';
import { toast } from 'react-toastify';

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      contentMarkdown: '',
      selectedOption: '',
      description: '',
      listdoctor: [],
      oldData: false,

      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectClinic: '',
      selectSpecialty: '',
      selectPrice: '',
      selectPayment: '',
      selectProvince: '',

      nameClinic: '',
      addressClinic: '',
      note: '',
      clinicId: '',
      specialtyId: '',
    };
  }

  componentDidMount() {
    this.props.getAllDoctor();
    this.props.getInforDoctorAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alldoctor !== this.props.alldoctor) {
      let dataselect = this.builDtaSelect(this.props.alldoctor, 'USERS');
      this.setState({
        listdoctor: dataselect,
      });
    }
    if (prevProps.allInfoDataDoctor !== this.props.allInfoDataDoctor) {
      let { payment, price, province, specialty, clinic } =
        this.props.allInfoDataDoctor;
      let dataSelectPrice = this.builDtaSelect(price, 'PRICE');
      let dataSelectPayment = this.builDtaSelect(payment, 'PAYMENT');
      let dataSelectProvince = this.builDtaSelect(province, 'PROVINCE');
      let dataSelectSpecialty = this.builDtaSelect(specialty, 'SPECIALTY');
      let dataSelectClinic = this.builDtaSelect(clinic, 'CLINIC');
      console.log(
        'data:',
        dataSelectPayment,
        dataSelectPrice,
        dataSelectProvince
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  builDtaSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      if (type === 'USERS') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.lastName} ${item.firstName}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'PRICE') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.valueVi}`;
          object.label = label;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.valueVi}`;
          object.label = label;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === 'SPECIALTY') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.name}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'CLINIC') {
        data.map((item, index) => {
          let object = {};
          let label = `${item.name}`;
          object.label = label;
          object.value = item.id;
          result.push(object);
        });
      }
    }

    return result;
  };

  handleValue = (event) => {
    this.setState({
      contentMarkdown: event,
    });
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailDoctorService(selectedOption.value);
    console.log('data res:', res);
    if (res && res.errCode === 0 && res.data && res.data.Blog) {
      let Blog = res.data.Blog;

      let addressClinic = '',
        clinicId = '',
        specialtyId = '',
        nameClinic = '',
        note = '',
        paymentId = '',
        priceId = '',
        provinceId = '',
        selectPayment = '',
        selectPrice = '',
        selectProvince = '',
        selectClinic = '',
        selectSpecialty = '';
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        clinicId = res.data.Doctor_Infor.clinicId;
        specialtyId = res.data.Doctor_Infor.specialtyId;

        selectPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        contentMarkdown: Blog.contentMarkdown,
        description: Blog.description,
        oldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectPayment: selectPayment,
        selectPrice: selectPrice,
        selectProvince: selectProvince,
        selectSpecialty: selectSpecialty,
        selectClinic: selectClinic,
      });
    } else {
      this.setState({
        contentMarkdown: '',
        description: '',
        addressClinic: '',
        nameClinic: '',
        note: '',
        selectPayment: '',
        selectPrice: '',
        selectProvince: '',
        selectSpecialty: '',
        selectClinic: '',
        oldData: false,
      });
    }
  };

  handleOnChangeDoctorInfo = (selectedOption, name) => {
    let statename = name.name;
    let stateCopy = { ...this.state };
    stateCopy[statename] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveInfoDoctor = () => {
    let { oldData } = this.state;
    this.props.createInfoDoctor({
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: oldData === true ? crudActions.EDIT : crudActions.CREATE,

      selectPrice: this.state.selectPrice.value,
      selectPayment: this.state.selectPayment.value,
      selectProvince: this.state.selectProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectClinic.value,
      specialtyId: this.state.selectSpecialty.value,
    });
    this.setState({
      contentMarkdown: '',
      description: '',
      addressClinic: '',
      nameClinic: '',
      note: '',
      selectPayment: '',
      selectPrice: '',
      selectProvince: '',
      selectSpecialty: '',
      selectClinic: '',
      oldData: false,
    });
  };

  render() {
    let { oldData } = this.state;
    console.log('state', this.state);
    return (
      <React.Fragment>
        <div className="mange-doctor-container">
          <div className="manage-doctor-title">Quản lý thông tin bác sĩ</div>
          <div className="manage-doctor-info">
            <div className="content-left ">
              <label>Chọn bác sĩ:</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listdoctor}
                placeholder={'Chọn bác sĩ'}
              />
            </div>
            <div className="content-right form-group">
              <label>Thông tin giới thiệu:</label>
              <textarea
                className="form-control"
                rows="4"
                value={this.state.description}
                onChange={(event) =>
                  this.handleOnChangeText(event, 'description')
                }
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row">
            <div className="col-4 form-group">
              <label>Chọn giá</label>
              <Select
                options={this.state.listPrice}
                value={this.state.selectPrice}
                onChange={this.handleOnChangeDoctorInfo}
                placeholder={'Chọn giá'}
                name="selectPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>Chọn phương thức thanh toán</label>
              <Select
                options={this.state.listPayment}
                value={this.state.selectPayment}
                onChange={this.handleOnChangeDoctorInfo}
                placeholder={'Chọn phương thức thanh toán'}
                name="selectPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>Chọn tỉnh thành</label>
              <Select
                value={this.state.selectProvince}
                options={this.state.listProvince}
                onChange={this.handleOnChangeDoctorInfo}
                placeholder={'Chọn tỉnh thành'}
                name="selectProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label>Tên phòng khám</label>
              <input
                className="form-control"
                value={this.state.nameClinic}
                onChange={(event) =>
                  this.handleOnChangeText(event, 'nameClinic')
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                className="form-control"
                value={this.state.addressClinic}
                onChange={(event) =>
                  this.handleOnChangeText(event, 'addressClinic')
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>Note</label>
              <input
                className="form-control"
                value={this.state.note}
                onChange={(event) => this.handleOnChangeText(event, 'note')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <labe>Chọn chuyên khoa</labe>
              <Select
                value={this.state.selectSpecialty}
                options={this.state.listSpecialty}
                placeholder="Chọn chuyên khoa"
                onChange={this.handleOnChangeDoctorInfo}
                name="selectSpecialty"
              />
            </div>
            <div className="col-4 form-group">
              <label>Chọn phòng khám</label>
              <Select
                value={this.state.selectClinic}
                options={this.state.listClinic}
                placeholder="Chọn phòng khám"
                onChange={this.handleOnChangeDoctorInfo}
                name="selectClinic"
              />
            </div>
          </div>
          <div className="manage-doctor-markdown">
            <MDEditor
              value={this.state.contentMarkdown}
              onChange={(event) => this.handleValue(event)}
            />
          </div>
          <button
            className={
              oldData === true
                ? 'update-content-markdown'
                : 'save-content-markdown'
            }
            onClick={() => this.handleSaveInfoDoctor()}
          >
            {oldData === true ? (
              <span>CẬP NHẬT THÔNG TIN</span>
            ) : (
              <span>LƯU THÔNG TIN</span>
            )}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alldoctor: state.admin.alldoctor,
    allInfoDataDoctor: state.admin.allInfoDataDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    getInforDoctorAction: () => dispatch(actions.getInforDoctorAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
