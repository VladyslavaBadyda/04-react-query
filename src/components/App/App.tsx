import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import styles from './App.module.css';
import { fetchMovies, searchMovies } from '../../services/movieService';
import type { MoviesResponse, Movie } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';

const App: React.FC = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    // Ми робимо запит тільки на пошук -- початкове завантаження вимкнено
    const fetchFn = () => searchMovies(query, page);

    const { data, isLoading, error } = useQuery<MoviesResponse, Error>(['movies', query, page], fetchFn, {
        keepPreviousData: true,
        enabled: !!query, // активуємо запит лише коли query не порожній
    });

    const movies: Movie[] = data?.results ?? [];
    const totalPages = data?.total_pages ?? 1;

    return (
        <div>
            <header className={styles.header}>
                <a className={styles.brand} href="#">Powered by TMDB</a>
                <SearchBar onSearch={(q) => { setQuery(q); setPage(1); }} />
            </header>

            <main className={styles.container}>
                <div className={styles.main}>
                    {!query ? (
                        <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
                            Введіть назву фільму у поле пошуку, щоб побачити результати.
                        </div>
                    ) : (
                        <>
                            {isLoading && <div>Loading...</div>}
                            {error && <div>{error.message}</div>}

                            {!isLoading && movies.length === 0 && <div>Нічого не знайдено</div>}

                            <MovieGrid movies={movies} />

                            {totalPages > 1 && (
                                <ReactPaginate
                                    pageCount={totalPages}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={1}
                                    onPageChange={({ selected }: { selected: number }) => setPage(selected + 1)}
                                    forcePage={page - 1}
                                    containerClassName={styles.pagination}
                                    activeClassName={styles.active}
                                    nextLabel="→"
                                    previousLabel="←"
                                />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;