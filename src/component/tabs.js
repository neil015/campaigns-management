import React from 'react';
import Link from './link';

const Tabs = ({tabsData, handleTabClick}) => (
    <div className="tabs">
        {
            tabsData.map((item, index) => <Link key={index} navLink={item} handleTabClick={handleTabClick} i={index}/>)
        }
    </div>
);

export default Tabs;