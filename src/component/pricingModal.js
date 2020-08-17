import React from 'react';

const PricingModal = ({ modalContent, language, handleCloseBtnClick }) => (
    <div className="pricing-modal">
        <div className="popup-header">
            <div className="popup-img" style={{backgroundImage: `url(${modalContent.image_url})`}}></div>
            <div className="popup-content">
                <p className="name">{modalContent.name}</p>
                <p className="location">{modalContent.region}</p>
            </div>
        </div>
        <div className="popup-body">
            <h3 className="heading">{language.pricing}</h3>
            <div className="content">
                <div className="period">
                    <p>{`1 ${language.week} - 1 ${language.month}`}</p>
                    <p>{`6 ${language.months}`}</p>
                    <p>{`1 ${language.year}`}</p>
                </div>
                <div className="price">
                    <p>{`$${modalContent.price.monthly}`}</p>
                    <p>{`$${modalContent.price.halfYearly}`}</p>
                    <p>{`$${modalContent.price.yearly}`}</p>
                </div>
            </div>
        </div>
        <div className="popup-footer">
            <div className="button-container">
                <button type="button" className="close-modal" onClick={handleCloseBtnClick}>{language.close}</button>
            </div>
        </div>
    </div>
);

export default PricingModal;