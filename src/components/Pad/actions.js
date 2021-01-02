import PadConstants from './constants';
import { PadStatus } from './constants';

function changePadStatusAction(audioEl, padsStatusArray, id) {
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
            // if(!padsStatusArray.includes(PadStatus.PLAYING)) {
            //
            // }
            // TODO
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

const PadActions = {
    changePadStatusAction
};

export default PadActions;