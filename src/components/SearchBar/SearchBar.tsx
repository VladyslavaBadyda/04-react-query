import React, { useState } from 'react';
import styles from './SearchBar.module.css';

type Props = {
    onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [q, setQ] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(q);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                placeholder="Search movies..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;