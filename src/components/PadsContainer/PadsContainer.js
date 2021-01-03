import React, { Component } from 'react';
import { connect } from "react-redux";
import './PadsContainer.css';
import Pad from "../Pad/Pad";
import PadsContainerActions from './actions'

// PadsContainer component contains 9 pads
class PadsContainer extends Component{
    componentDidMount() {
        this.props.loadPadsStatus();
    }

    render() {
        return (
            <div className="padsContainer">
                {this.props.padsStatusArray.map((elm, i) => <Pad id={i+1} />)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        padsStatusArray: state.padsContainer.padsStatusArray
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPadsStatus: () => {
            dispatch(PadsContainerActions.loadPadsStatusAction());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PadsContainer);