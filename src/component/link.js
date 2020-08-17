import React from 'react';

const Link = ({navLink, handleTabClick, i}) => {
    const pathname = navLink.replace(/\s/g, ''); 
    return (
        <div className="tab" onClick={(event) => handleTabClick(event, pathname, i)}>
            <span className="link">{navLink}</span>
        </div>
    );
}

export default Link;