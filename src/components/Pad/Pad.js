import React, { Component } from 'react';
import { connect } from "react-redux";
import './Pad.css';
import PadActions from "./actions";
import { PadStatus } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

// Pad component is a square which contains a title and a play/stop button
class Pad extends Component{
    getButtonClasses() {
        // Get the button's css classes according to the status
        if(this.props.padsStatusArray[this.props.id - 1] !== PadStatus.STOPPING){
            return "pad-btn stop-btn";
        }
        return "pad-btn play-btn";
    }

    getButtonIcon() {
        // Get the button's icon according to the status
        if(this.props.padsStatusArray[this.props.id - 1] !== PadStatus.STOPPING){
            return faStop;
        }
        return faPlay;
    }

    render() {
        return (
            <div id={"pad-" + this.props.id} className="pad">
                <h3 className="pad-title">Loop {this.props.id}</h3>
                <button
                    className={this.getButtonClasses()}
                    onClick={() => this.props.changePadStatus(this.props.padsStatusArray, this.props.id)}
                >
                    <FontAwesomeIcon className="pad-icon-btn" icon={this.getButtonIcon()}/>
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