import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
  handleGEtAllUSer,
  createNewUserService,
  deleteUserService,
  updateUserService,
} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReactJS();
  }
  getAllUserFromReactJS = async () => {
    let response = await handleGEtAllUSer('ALL');
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: response.user,
      });
    }
  };
  handlerNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  noRefCheckUserEdit = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReactJS();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleUpdateUser = async (user) => {
    console.log('user', user);
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };
  editUser = async (user) => {
    try {
      let response = await updateUserService(user);
      if (response && response.errCode === 0) {
        await this.getAllUserFromReactJS();
        this.setState({
          isOpenEditModal: false,
        });
      } else {
        alert(response.errCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handlerDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUserFromReactJS();
      } else {
        alert(response.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUser;
    return (
      <div className="container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          noRefCheckUser={this.noRefCheckUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditModal && (
          <ModalEditUser
            isOpen={this.state.isOpenEditModal}
            noRefCheckUserEdit={this.noRefCheckUserEdit}
            userEdit={this.state.userEdit}
            updateUser={this.editUser}
          />
        )}
        <div className="text-center mt-2">Quản lý user</div>
        <div>
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handlerNewUser()}
          >
            <i class="fas fa-plus"></i>Thêm mới người dùng
          </button>
        </div>
        <div className="table mt-4">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Tên</th>
                <th>Họ và chữ lót</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Quyền</th>
                <th>Hành động</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.address}</td>
                      <td>{item.roleId}</td>
                      <td>
                        <button
                          className="update-user"
                          onClick={() => this.handleUpdateUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="delete-user"
                          onClick={() => this.handlerDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
