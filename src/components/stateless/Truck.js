import React from 'react'

import Order from './Order';

function Truck({truckName, orders, fromTop, timeLineWidth, firstCurrentTimePoint}) {

    
    return (         
        <div className="truck" style={{top: fromTop}}>
            <div className="truckName">
            <svg className="truckIcon" width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="19" y="64" width="287" height="92" fill="var(--primaryColor)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M238 166H19V175.556L39.6656 185H238V166Z" fill="var(--primaryColor)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M317.715 89.0474C317.715 89.0474 356.275 88.2889 363.122 92.84C369.97 97.3911 377.614 121.451 380.06 138.73C382.175 153.673 380.06 177.415 380.06 177.415L369.97 185H246V166H317.715V89.0474ZM373.934 141.006C373.934 141.006 369.609 98.5289 354.834 98.5289H330.328V141.006H373.934Z" fill="var(--primaryColor)"/>
            <circle cx="345" cy="191" r="23" fill="var(--primaryColor)" stroke="white" strokeWidth="4"/>
            <circle cx="69" cy="191" r="23" fill="var(--primaryColor)" stroke="white" strokeWidth="4"/>
            <circle cx="134" cy="191" r="23" fill="var(--primaryColor)" stroke="white" strokeWidth="4"/>
            <circle cx="280" cy="191" r="23" fill="var(--primaryColor)" stroke="white" strokeWidth="4"/>
            </svg>
               <span className="tName">{truckName}</span></div>
            <div className="line"></div>
            {orders.map(order => <Order 
            key={order.id}
            name={order.id} 
            timeLineWidth={timeLineWidth}
            firstCurrentTimePoint={firstCurrentTimePoint}
            startPoint={Number(new Date(order.from).getTime())}
            endPoint={Number(new Date(order.to).getTime())} />)}
        </div>
    )
}

export default Truck
