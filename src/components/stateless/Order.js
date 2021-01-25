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
        console.log("onsetPoint", onsetPoint);
        return onsetPoint;        
    }

    const calcWidth = () => {
        let calcWidth;
        const lastTimeStamp = firstCurrentTimePoint + timeLineWidth;
        if (startPoint > firstCurrentTimePoint && startPoint < lastTimeStamp){
            if (lastTimeStamp > endPoint){
                calcWidth = Math.floor(((endPoint - startPoint)/timeLineWidth)*100) + "%" ;
            } else {
                calcWidth = Math.floor(((lastTimeStamp - startPoint)/timeLineWidth)*100) + "%" ;
            } 
        } else {
            calcWidth = "0%";
        }
        console.log("calcWidth", calcWidth);
        return calcWidth;
    }


    return (
        <div className={calcWidth() !== "0%" ? "order" : "hidden"} 
            style={{left: calcOnsetPoint(), width: calcWidth()}}
            >
            {startPoint < lastTimeStamp - timeLineWidth/4 && <div className="orderContent">
                <span className="orderName">{name}</span>  - due to: { formatDate(endPoint)}
                </div>} 
        </div>
    )
}

export default Order
