import React from 'react';

const SubHeader = ({ manageFixers, handleLanguageChange, isEnglish }) => (
    <div className="fixers-wrapper">
        <h1 className="fixers-heading">{manageFixers}</h1>
        <div className="change-lang-cont">
            <button type="button" className="change-lang-btn" onClick={handleLanguageChange}>Change Language To {isEnglish ? 'German' : 'English'}</button>
        </div>
    </div>
);

export default SubHeader;