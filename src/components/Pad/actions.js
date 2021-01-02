import PadConstants from './constants';
import { PadStatus } from './constants';

function getAudioElement(id) {
    return document.getElementById("audio-" + id);
}

function playAllPendingPads(padsStatusArray) {
    return padsStatusArray.map((status, i) => {
        if(padsStatusArray[i] === PadStatus.PENDING) {
            const tmpAudioEl = getAudioElement(i+1);
            tmpAudioEl.play();
            tmpAudioEl.loop = true;
            return PadStatus.PLAYING;
        }
        return status;
    });
}

function changePadStatusAction(padsStatusArray, id) {
    const audioEl = getAudioElement(id);
    let newStatus;
    switch (padsStatusArray[id-1]) {
        case PadStatus.STOPPING:
            if(padsStatusArray.includes(PadStatus.PLAYING) || padsStatusArray.includes(PadStatus.PENDING)) {
                newStatus = PadStatus.PENDING
            }
            else {
                newStatus =  PadStatus.PLAYING;
                audioEl.play();
                audioEl.loop = true;
            }
            break;
        case PadStatus.PENDING:
            newStatus = PadStatus.STOPPING;
            break;
        case PadStatus.PLAYING:
            audioEl.pause();
            audioEl.currentTime = 0;
            newStatus = PadStatus.STOPPING;
            if(padsStatusArray.filter(status => status === PadStatus.PLAYING).length === 1) {
                padsStatusArray = playAllPendingPads(padsStatusArray);
            }
            break;
        default:
            break;
    }
    const newPadsStatusArray = padsStatusArray.map((status, i) => i === id - 1 ? newStatus : status);
    return {
        type: PadConstants.CHANGE_PAD_STATUS,
        payload: {
            padsStatusArray: newPadsStatusArray
        }
    }
}

function handleTimeUpdateAction(padsStatusArray, id) {
    const audioEl = getAudioElement(id);
    if(audioEl.currentTime === 0 && audioEl.paused === false) {
        const newPadsStatusArray = playAllPendingPads(padsStatusArray);
        return {
            type: PadConstants.HANDLE_TIME_UPDATE,
            payload: {
                padsStatusArray: newPadsStatusArray
            }
        };
    }
    return {
        type: PadConstants.IGNORE_TIME_UPDATE,
    };
}

const PadActions = {
    changePadStatusAction,
    handleTimeUpdateAction
};

export default PadActions;