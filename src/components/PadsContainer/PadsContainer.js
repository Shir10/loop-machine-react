import React, { Component } from 'react';
import { connect } from "react-redux";
import './PadsContainer.css';
import Pad from "../Pad/Pad";
import PadsContainerActions from './actions'

class PadsContainer extends Component{
    componentDidMount() {
        this.props.loadPadsStatus();
    }

    render() {
        // const padNumbers = [];
        // for(let i = 1; i <= 9; i++) {
        //     padNumbers.push(i);
        // }

        return (
            <div className="padsContainer">
                <div className="app-container">
                    {this.props.padsStatusArray.map((elm, i) => <Pad id={i+1} />)}

                </div>
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