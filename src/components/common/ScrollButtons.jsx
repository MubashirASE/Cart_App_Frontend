import React from "react";

const ScrollButtons = ({ onLeftClick, onRightClick, leftDisabled = false, rightDisabled = false }) => {
    return (
        <div className="flex gap-3 mt-2 sm:mt-0">
            <button
                onClick={onLeftClick}
                disabled={leftDisabled}
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center rotate-180 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <img src="/arrowRight.png" className="w-5 h-5" alt="Previous" />
            </button>
            <button
                onClick={onRightClick}
                disabled={rightDisabled}
                className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <img src="/arrowRight.png" className="w-5 h-5" alt="Next" />
            </button>
        </div>
    );
};

export default ScrollButtons;
