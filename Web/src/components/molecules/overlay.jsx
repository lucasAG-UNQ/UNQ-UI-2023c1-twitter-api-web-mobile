import React from 'react';
import "../../styles/molecules/overlay.css";

export function Overlay({isOpen,onClose,children }) {

    return (
        <>
        {isOpen? (
            <div className="overlay">
                <div className="overlay__background" onClick={onClose} />
                    <div className="overlay__container bg-dark">
                        <div className="overlay__controls">
                            <button
                                className="overlay__close"
                                type="button"
                                onClick={onClose}
                            />
                        </div>
                            {children}
                    </div>
            </div>
        ):<></>}
        </>
    );
}
