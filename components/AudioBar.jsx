import React from "react";

export default function AudioBar({duration, curTime, onTimeUpdate}) {

    const curPercentage = (curTime / duration) * 100;

    const formatDuration = (t) => {
        let secs = Math.floor(t % 60)
        let mins = Math.floor((t - secs) / 60)
        if (secs < 10) secs = '0' + secs
        return '' + mins + ':' + secs
    }

    function calcClickedTime(e) {
        const clickPositionInPage = e.pageX;
        const bar = document.querySelector(".bar__progress");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    function handleTimeDrag(e) {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = eMove => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        document.addEventListener("mousemove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", updateTimeOnMove);
        });
    }

    return (
        <div className="w-full bar">
            
            <div
                className="bar__progress bg-gray-200 rounded-full flex-1 h-1 flex items-center cursor-pointer"
                style={{
                    background: `linear-gradient(to right, black ${curPercentage}%, rgb(229, 231, 235) 0)`
                }}
                onMouseDown={e => handleTimeDrag(e)}
            >
                <span
                    className="bar__progress__knob relative w-3 h-3 rounded-full bg-black"
                    style={{ left: `${curPercentage - 1}%` }}
                />
            </div>

            <div className="items-center text-xs justify-between mt-1 flex">
                <span className="bar__time">{formatDuration(curTime)}</span>
                <span className="bar__time">-{formatDuration(duration - curTime)}</span>
            </div>

        </div>
    );
}
