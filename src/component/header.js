import React from 'react';

const Header = ({headerText}) => {
    return (
        <header className="app-header">
            <p className="header-text">BlueStacks</p>
            <p className="header-text-green">{headerText}</p>
        </header>
    );
}

export default Header;