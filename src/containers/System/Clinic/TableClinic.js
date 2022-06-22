import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './TableClinic.scss';
import * as actions from '../../../store/actions';
import { deleteClinicServices } from '../../../services/clinicServices';
import { toast } from 'react-toastify';
class TableClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    };
  }

  componentDidMount() {
    this.props.getClinic();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        clinics: this.props.listClinic,
      });
    }
  }
  hadleDeleteClinic = async (clinic) => {
    let res = await deleteClinicServices(clinic.id);
    if (res && res.errCode === 0) {
      toast.success('Xóa phòng khám thành công');
      this.props.getClinic();
    } else {
      toast.error('Xóa phòng khám thất bại');
    }
  };
  hadleUpdateClinic = (clinic) => {
    this.props.handleEditClinic(clinic);
  };

  render() {
    let { clinics } = this.state;
    return (
      <React.Fragment>
        <table id="TableClinic">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Tên chuyên khoa</th>
              <th>Địa chỉ</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
            {clinics &&
              clinics.length > 0 &&
              clinics.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="update-user"
                        onClick={() => this.hadleUpdateClinic(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="delete-user"
                        onClick={() => this.hadleDeleteClinic(item)}
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
    listClinic: state.admin.clinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClinic: () => dispatch(actions.getClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableClinic);
