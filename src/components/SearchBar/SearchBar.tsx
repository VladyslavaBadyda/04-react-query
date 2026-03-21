import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    onSubmit: (formData: FormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const q = (fd.get('query') as string) || '';
        if (!q.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }
        onSubmit(fd);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;