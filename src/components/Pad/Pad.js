import React, { Component } from 'react';
import { connect } from "react-redux";
import './Pad.css';
import PadActions from "./actions";
import { PadStatus } from './constants';

class Pad extends Component{
    getButtonClasses() {
        if(this.props.padsStatusArray[this.props.id - 1] !== PadStatus.STOPPING){
            return "pad-btn stop-btn";
        }
        return "pad-btn play-btn";
    }

    getButtonName() {
        if(this.props.padsStatusArray[this.props.id - 1] !== PadStatus.STOPPING){
            return "Stop";
        }
        return "Play";
    }

    render() {
        return (
            <div className="pad">
                <h3>Loop {this.props.id}</h3>
                <button
                    className={this.getButtonClasses()}
                    onClick={() => this.props.changePadStatus(this.props.padsStatusArray, this.props.id)}
                >
                    {this.getButtonName()}
                </button>
                <audio id={"audio-" + this.props.id} className="audio-element" onTimeUpdate={() => this.props.handleTimeUpdate(this.props.padsStatusArray, this.props.id)}>
                    <source src={process.env.PUBLIC_URL + '/loop_samples/loop-' + this.props.id + '.mp3'}/>
                </audio>
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
        changePadStatus: (padsStatusArray, id) => {
            dispatch(PadActions.changePadStatusAction(padsStatusArray, id));
        },
        handleTimeUpdate: (padsStatusArray, id) => {
            dispatch(PadActions.handleTimeUpdateAction(padsStatusArray, id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pad);