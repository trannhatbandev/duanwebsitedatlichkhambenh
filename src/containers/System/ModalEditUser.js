import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
    };
  }

  componentDidMount() {
    let user = this.props.userEdit;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'hardcode',
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
  }

  noRefCheck = () => {
    this.props.noRefCheckUserEdit();
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('Thiếu dữ liệu: ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleUpdateUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.updateUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.noRefCheck();
        }}
        className={'modal-new-user'}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.noRefCheck();
          }}
        >
          Cập nhật thông tin người dùng
        </ModalHeader>
        <ModalBody>
          <div className="modal-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'email');
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'password');
                }}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'firstName');
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'lastName');
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container">
              <label>Phone number</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'phoneNumber');
                }}
                value={this.state.phoneNumber}
              />
            </div>
            <div className="input-container address-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, 'address');
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleUpdateUser();
            }}
          >
            Cập nhật
          </Button>{' '}
          <Button
            onClick={() => {
              this.noRefCheck();
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
