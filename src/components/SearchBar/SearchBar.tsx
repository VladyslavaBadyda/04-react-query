import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const query = (formData.get('query') as string) || '';

        if (!query.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }

        onSubmit(query.trim());
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;