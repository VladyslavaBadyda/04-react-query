import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    // onSubmit отримує сам рядок пошукового запиту
    onSubmit: (query: string) => void;
    // необов'язкова функція action яка отримує FormData
    action?: (formData: FormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, action }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const q = (fd.get('query') as string) || '';

        if (action) {
            // якщо передано action — викликаємо його з FormData
            action(fd);
            return;
        }

        if (!q.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }

        onSubmit(q.trim());
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;