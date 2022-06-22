import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
import TableUser from './TableUser';
import { crudActions, CommonUtils } from '../../../utils';
class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgURL: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      role: '',
      position: '',
      image: '',
      id: '',
      action: '',
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPostionStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let arrGenders = this.props.gender;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.role !== this.props.role) {
      let arrRoles = this.props.role;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }
    if (prevProps.position !== this.props.position) {
      let arrPositions = this.props.position;
      this.setState({
        positionArr: this.props.position,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.gender;
      let arrRoles = this.props.role;
      let arrPositions = this.props.position;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
        image: '',
        previewImgURL: '',
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
        image: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('Cần nhập: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handlerInsertUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let action = this.state.action;

    if (action === crudActions.CREATE) {
      this.props.createUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      });
    }
    if (action === crudActions.EDIT) {
      this.props.updateUser({
        id: this.state.id,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      });
    }
  };
  handleEditUser = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }

    this.setState({
      email: user.email,
      password: '123456',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      image: '',
      previewImgURL: imageBase64,
      action: crudActions.EDIT,
      id: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
      position,
      image,
    } = this.state;
    return (
      <div className="user-container">
        <div className="title">Quản lý người dùng</div>
        <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
        <div className="body">
          <div className="col-12 text-center mt-3 mb-3 font">
            Thêm mới người dùng
          </div>
          <div className="container">
            <div className="row">
              <div className="col-3 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, 'email');
                  }}
                  disabled={
                    this.state.action === crudActions.EDIT ? true : false
                  }
                />
              </div>
              <div className=" col-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, 'password');
                  }}
                  disabled={
                    this.state.action === crudActions.EDIT ? true : false
                  }
                />
              </div>
              <div className=" col-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, 'firstName');
                  }}
                />
              </div>
              <div className="col-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, 'lastName');
                  }}
                />
              </div>

              <div className="col-3 mb-3">
                <label>Phone number</label>
                <input
                  type="text"
                  className="form-control phoneNumber"
                  placeholder="+84"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, 'phoneNumber');
                  }}
                />
              </div>
              <div className="col-9">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control address"
                  placeholder="Address"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, 'address');
                  }}
                />
              </div>

              <div className="col-3 mb-3">
                <label>Gender</label>
                <select
                  className="form-control gender"
                  onChange={(event) => {
                    this.onChangeInput(event, 'gender');
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Quyền</label>
                <select
                  className="form-control role"
                  onChange={(event) => {
                    this.onChangeInput(event, 'role');
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Chức vụ</label>
                <select
                  className="form-control position"
                  onChange={(event) => {
                    this.onChangeInput(event, 'position');
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="col-3 mb-3">
              <div className="preview-image-container">
                <label>Hình ảnh</label>
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
            <div className="col-3">
              {' '}
              <button
                className={
                  this.state.action === crudActions.EDIT
                    ? 'btn btn-success'
                    : 'btn btn-primary'
                }
                onClick={() => this.handlerInsertUser()}
              >
                {this.state.action === crudActions.EDIT ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
            <div className="col-12">
              <TableUser handleEditUser={this.handleEditUser} />
            </div>
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
    gender: state.admin.gender,
    role: state.admin.role,
    position: state.admin.position,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPostionStart: () => dispatch(actions.fetchPostionStart()),
    createUser: (data) => dispatch(actions.createUser(data)),
    readUser: () => dispatch(actions.readUser()),
    updateUser: (data) => dispatch(actions.updateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
