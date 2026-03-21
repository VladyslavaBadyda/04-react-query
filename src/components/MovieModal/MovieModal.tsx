// MovieModal.tsx

import React from 'react';
import styles from './MovieModal.module.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const MovieModal: React.FC<Props> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modal}>
            <button onClick={onClose}>Close</button>
            {children}
        </div>
    );
};

export default MovieModal;
