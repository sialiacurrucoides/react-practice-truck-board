import React from 'react'

function TimePoint({date, position}) {
    return (
        <div className="timePoint" style={{left: position}}>
            <div className="timePointBox">
                <div className="flagEffect"></div>
                <span className="dateText">{date}</span></div>
            <div className="verticalLine"></div>
        </div>
    )
}

export default TimePoint

