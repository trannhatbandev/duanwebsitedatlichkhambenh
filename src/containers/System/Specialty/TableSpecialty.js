import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import './TableSpecialty.scss';
import * as actions from '../../../store/actions';
import { deleteSpecialtyServices } from '../../../services/specialtyService';
import { toast } from 'react-toastify';
class TableSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtys: [],
    };
  }

  componentDidMount() {
    this.props.getSpecialty();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialtys !== this.props.listSpecialtys) {
      this.setState({
        specialtys: this.props.listSpecialtys,
      });
    }
  }
  hadleDeleteSpecialty = async (specialty) => {
    let res = await deleteSpecialtyServices(specialty.id);
    if (res && res.errCode === 0) {
      toast.success('Xóa chuyên thành công');
      this.props.getSpecialty();
    } else {
      toast.error('Xóa chuyên khoa thất bại');
    }
  };
  hadleUpdateSpecialty = (specialty) => {
    this.props.handleEditSpecialty(specialty);
  };

  render() {
    let { specialtys } = this.state;
    return (
      <React.Fragment>
        <table id="TableSpecialty">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Tên chuyên khoa</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
            {specialtys &&
              specialtys.length > 0 &&
              specialtys.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="update-user"
                        onClick={() => this.hadleUpdateSpecialty(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="delete-user"
                        onClick={() => this.hadleDeleteSpecialty(item)}
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
    listSpecialtys: state.admin.specialtys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialty: () => dispatch(actions.getSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialty);
