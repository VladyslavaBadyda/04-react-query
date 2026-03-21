import React, { useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

export interface SearchBarProps {
    // onSubmit отримує сам рядок пошукового запиту
    onSubmit?: (query: string) => void;
    action?: (formData: FormData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, action }) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;
        if (action) {
            (form as any).action = action;
            (form as any).actionFunction = action;
            form.setAttribute('data-has-action-fn', 'true');
        } else {
            try {
                delete (form as any).actionFunction;
            } catch (e) { }
            form.removeAttribute('data-has-action-fn');
        }
    }, [action]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const q = (fd.get('query') as string) || '';

        const fn = (form as any).actionFunction || (form as any).action;
        if (fn && typeof fn === 'function') {
            try {
                fn(fd);
            } catch (err) {
                console.error('Action function threw:', err);
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
        <form ref={formRef} className={styles.searchBar} onSubmit={handleSubmit}>
            <input name="query" placeholder="Search movies..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;