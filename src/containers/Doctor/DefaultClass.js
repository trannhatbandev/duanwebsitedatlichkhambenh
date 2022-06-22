import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DefaultClass.scss';
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdParent !== prevProps.doctorIdParent) {
    }
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
