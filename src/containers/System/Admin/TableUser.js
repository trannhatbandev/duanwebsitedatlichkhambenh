import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './TableUser.scss';
import * as actions from '../../../store/actions';

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
    };
  }

  componentDidMount() {
    this.props.readUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        users: this.props.listUsers,
      });
    }
  }
  hadleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  };
  hadleUpdateUser = (user) => {
    this.props.handleEditUser(user);
  };

  render() {
    let users = this.state.users;
    return (
      <React.Fragment>
        <table id="TableUser">
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
            {users &&
              users.length > 0 &&
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.address}</td>
                    <td>{item.roleId}</td>
                    <td>
                      <button
                        className="update-user"
                        onClick={() => this.hadleUpdateUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="delete-user"
                        onClick={() => this.hadleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readUser: () => dispatch(actions.readUser()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
