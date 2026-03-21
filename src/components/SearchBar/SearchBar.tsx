import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    action: (formData: FormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ action }) => {
    const formAction = (formData: FormData) => {
        const q = (formData.get('query') as string) || '';

        if (!q.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }

        action(formData);
    };

    return (
        <form className={styles.searchBar} action={formAction}>
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;