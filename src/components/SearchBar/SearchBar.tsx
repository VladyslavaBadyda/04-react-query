import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [q, setQ] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!q.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }
        onSubmit(q.trim());
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit} action="">
            <input name="query" placeholder="Search movies..." value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;