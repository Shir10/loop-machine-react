import React, { Component } from 'react';
import './Pad.css';
import { connect } from "react-redux";
import PadActions from "./actions";
import { PadStatus } from './constants';


class Pad extends Component{
    getAudioElement() {
        return document.getElementById("audio-" + this.props.id);
    }

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
        console.log("000000", this.props.padsStatusArray);
        return (
            <div className="pad">
                <h3>Loop {this.props.id}</h3>
                <button
                    className={this.getButtonClasses()}
                    onClick={() => this.props.changePadStatus(this.getAudioElement(), this.props.padsStatusArray, this.props.id)}
                >
                    {this.getButtonName()}
                </button>
                <audio id={"audio-" + this.props.id} className="audio-element">
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
        changePadStatus: (audioEl, padsStatusArray, id) => {
            dispatch(PadActions.changePadStatusAction(audioEl, padsStatusArray, id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pad);