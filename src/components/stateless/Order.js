import React from 'react';
import {formatDate} from '../../utils/utilities';

function Order({name, startPoint, endPoint, timeLineWidth, firstCurrentTimePoint}) {

    const lastTimeStamp = firstCurrentTimePoint + timeLineWidth;
    const calcOnsetPoint = () => {
        let onsetPoint;
        if (startPoint > firstCurrentTimePoint && startPoint < lastTimeStamp){
            onsetPoint = ((startPoint - firstCurrentTimePoint)/(lastTimeStamp - firstCurrentTimePoint))*100 + "%";
        } else {
            onsetPoint = "0%";
        }
        return onsetPoint;        
    }

    const calcWidth = () => {
        let calcWidth;
        const lastTimeStamp = firstCurrentTimePoint + timeLineWidth;
        if (startPoint > firstCurrentTimePoint && startPoint < lastTimeStamp){
            if (lastTimeStamp > endPoint){
                calcWidth = Math.floor(((endPoint - startPoint)/timeLineWidth)*100);
            } else {
                calcWidth = Math.floor(((lastTimeStamp - startPoint)/timeLineWidth)*100);
            } 
        } else if (startPoint !== 0 && startPoint < firstCurrentTimePoint && endPoint < lastTimeStamp) {
            calcWidth = Math.floor(((endPoint - firstCurrentTimePoint)/timeLineWidth)*100);
            if (calcWidth < 6) calcWidth = 0;
        }
        else {
            calcWidth = 0;
        }
        return calcWidth;
    }

    const widthVal = calcWidth() + "%";

    return (
        <div className={calcWidth() !== 0 ? "order" : "hidden"} 
            style={{left: calcOnsetPoint(), width: widthVal}}
            >
            {(calcWidth() > 20) && <div className="orderContent">
                <span className="orderName">{name}</span>  - due to: { formatDate(endPoint)}
                </div>} 
        </div>
    )
}

export default Order
