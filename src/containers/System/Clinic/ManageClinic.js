import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import * as actions from '../../../store/actions';
import { CommonUtils, crudActions } from '../../../utils';
import MDEditor from '@uiw/react-md-editor';
import {
  createNewClinicServices,
  updateClinicServices,
} from '../../../services/clinicServices';
import Lightbox from 'react-image-lightbox';
import TableClinic from './TableClinic';
import { toast } from 'react-toastify';

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      descriptionMarkdown: '',
      imageBase64: '',
      address: '',
      previewImgURL: '',
      isOpen: false,
      id: '',
      action: '',
    };
  }

  componentDidMount() {
    this.props.getClinic();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        name: '',
        imageBase64: '',
        previewImgURL: '',
        descriptionMarkdown: '',
        address: '',
        action: crudActions.CREATE,
      });
    }
  }

  handleImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleValue = (event) => {
    this.setState({
      descriptionMarkdown: event,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveClinic = async () => {
    let action = this.state.action;

    if (action === crudActions.CREATE) {
      let response = await createNewClinicServices(this.state);
      if (response && response.errCode === 0) {
        this.props.getClinic();
        toast.success('Thêm phòng khám thành công');
        this.setState({
          name: '',
          descriptionMarkdown: '',
          imageBase64: '',
          address: '',
        });
      } else {
        toast.error('Thêm phòng khám không thành công');
      }
    }
    if (action === crudActions.EDIT) {
      let response = await updateClinicServices(this.state);
      if (response && response.errCode === 0) {
        toast.success('Cập nhật phòng khám thành công');
        this.props.getClinic();
        this.setState({
          name: '',
          address: '',
          descriptionMarkdown: '',
          imageBase64: '',
        });
      } else {
        toast.error('Cập nhật phòng khám không thành công');
      }
    }
  };
  handleEditClinic = (clinic) => {
    console.log(clinic);
    let image1 = '';
    if (clinic.image) {
      image1 = new Buffer(clinic.image, 'base64').toString('binary');
    }

    this.setState({
      imageBase64: '',
      name: clinic.name,
      address: clinic.address,
      previewImgURL: image1,
      descriptionMarkdown: clinic.description,
      action: crudActions.EDIT,
      id: clinic.id,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="title">Quản lý phòng khám</div>

        <div className="add-new-specialty row">
          <div className="col-3 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeText(event, 'name')}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeText(event, 'address')}
            />
          </div>
          <div className="col-3 mb-3">
            <div className="preview-image-container">
              <label>Ảnh phòng khám</label>
              <input
                id="previewImage"
                type="file"
                hidden
                onChange={(event) => {
                  this.handleImage(event);
                }}
              />
              <label htmlFor="previewImage" className="upload">
                Tải ảnh
                <i style={{ padding: '10px' }} className="fas fa-upload"></i>
              </label>
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImgURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          <div className="col-12">
            <label>Mô tả</label>
            <MDEditor
              value={this.state.descriptionMarkdown}
              onChange={(event) => this.handleValue(event)}
            />
          </div>
          <div className="col-12">
            <button
              className={
                this.state.action === crudActions.EDIT
                  ? 'btn btn-success'
                  : 'btn btn-primary'
              }
              onClick={() => this.handleSaveClinic()}
            >
              {this.state.action === crudActions.EDIT ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </div>
        <div className="col-12">
          <TableClinic handleEditClinic={this.handleEditClinic} />
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { listClinic: state.admin.clinics };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClinic: () => dispatch(actions.getClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
