import PadConstants from './constants';
import { PadStatus } from './constants';

// Get audio element according the id
export function getAudioElement(id) {
    return document.getElementById("audio-" + id);
}

// Play all the pending pads and change their status to playing
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
    // Get audio element according the pad id
    const audioEl = getAudioElement(id);
    let newStatus;
    switch (padsStatusArray[id-1]) {
        // If the pad has a stopping status and there is at least one pad that is pending or playing
        // we should change its status to pending, otherwise to playing and play its loop
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
        // If the pad has a pending status we should change its status to stopping
        case PadStatus.PENDING:
            newStatus = PadStatus.STOPPING;
            break;
        // If the pad has a playing status we should change its status to stopping, stop the loop.
        // If there are not other pads that have playing status, we will play all the pending pads
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
    // Get audio element according the pad id
    const audioEl = getAudioElement(id);
    // If the pad reached the start of the loop (currentTime = 0) by playing the loop (and not by stopping the loop)
    // we should start play all the pending pads
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