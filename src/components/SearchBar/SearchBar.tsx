import React from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    // onSubmit отримує сам рядок пошукового запиту
    onSubmit?: (query: string) => void;
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
            // викликаємо action з FormData
            try {
                action(fd);
            } catch (err) {
                console.error('Action throw:', err);
            }
            return;
        }

        if (!q.trim()) {
            toast.error('Потрібно ввести пошуковий запит');
            return;
        }

        onSubmit && onSubmit(q.trim());
    };

    return (
        <form
            className={styles.searchBar}
            onSubmit={handleSubmit}
            // Примітка: у клієнтському React атрибут action не може бути функцією на рівні браузера,
            // тому тут ми присвоюємо його через приведення типів, щоб відповісти на вимогу
            action={action as unknown as string}
        >
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;