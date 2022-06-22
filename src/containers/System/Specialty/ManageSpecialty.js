import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import * as actions from '../../../store/actions';
import TableSpecialty from './TableSpecialty';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, crudActions } from '../../../utils';
import MDEditor from '@uiw/react-md-editor';
import {
  createNewSpecialtyServices,
  updateSpecialtyServices,
} from '../../../services/specialtyService';
import { toast } from 'react-toastify';

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      descriptionMarkdown: '',
      imageBase64: '',
      previewImgURL: '',
      isOpen: false,
      id: '',
      action: '',
    };
  }

  componentDidMount() {
    this.props.getSpecialty();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialtys !== this.props.listSpecialtys) {
      this.setState({
        name: '',
        imageBase64: '',
        previewImgURL: '',
        descriptionMarkdown: '',
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
  handleSaveSpecialty = async () => {
    let action = this.state.action;

    if (action === crudActions.CREATE) {
      let response = await createNewSpecialtyServices(this.state);
      if (response && response.errCode === 0) {
        toast.success('Thêm chuyên khoa thành công');
        this.props.getSpecialty();
        this.setState({
          name: '',
          descriptionMarkdown: '',
          imageBase64: '',
        });
      } else {
        toast.error('Thêm chuyên khoa không thành công');
      }
    }
    if (action === crudActions.EDIT) {
      let response = await updateSpecialtyServices(this.state);
      if (response && response.errCode === 0) {
        toast.success('Cập nhật chuyên khoa thành công');
        this.props.getSpecialty();
        this.setState({
          name: '',
          descriptionMarkdown: '',
          imageBase64: '',
        });
      } else {
        toast.error('Cập nhật chuyên khoa không thành công');
      }
    }
  };
  handleEditSpecialty = (specialty) => {
    console.log(specialty);
    let image1 = '';
    if (specialty.image) {
      image1 = new Buffer(specialty.image, 'base64').toString('binary');
    }

    this.setState({
      imageBase64: '',
      name: specialty.name,
      previewImgURL: image1,
      descriptionMarkdown: specialty.description,
      action: crudActions.EDIT,
      id: specialty.id,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="title">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeText(event, 'name')}
            />
          </div>
          <div className="col-3 mb-3">
            <div className="preview-image-container">
              <label>Ảnh chuyên khoa</label>
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
              onClick={() => this.handleSaveSpecialty()}
            >
              {this.state.action === crudActions.EDIT ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
          <div className="col-12">
            <TableSpecialty handleEditSpecialty={this.handleEditSpecialty} />
          </div>
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
  return {
    listSpecialtys: state.admin.specialtys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialty: () => dispatch(actions.getSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
