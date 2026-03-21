import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import styles from './App.module.css';
import { fetchMovies, searchMovies } from '../../services/movieService';
import type { MoviesResponse, Movie } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';
import MovieModal from '../MovieModal/MovieModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { Toaster, toast } from 'react-hot-toast';

const App: React.FC = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    // Ми робимо запит тільки на пошук -- початкове завантаження вимкнено
    const fetchFn = () => searchMovies(query, page);

    const { data, isLoading, error } = useQuery<MoviesResponse, Error>(['movies', query, page], fetchFn, {
        keepPreviousData: true,
        enabled: !!query, // активуємо запит лише коли query не порожній
        placeholderData: () => ({ page: 1, total_pages: 1, results: [] }),
    });

    const movies: Movie[] = data?.results ?? [];
    const totalPages = data?.total_pages ?? 1;

    // показ toast коли пустий результат після успіху
    React.useEffect(() => {
        if (data && !isLoading && movies.length === 0 && query) {
            toast('Пошук не дав результатів', { icon: '🔍' });
        }
    }, [data, isLoading, movies.length, query]);

    return (
        <div>
            <Toaster />
            <header className={styles.header}>
                <a className={styles.brand} href="#">Powered by TMDB</a>
                <SearchBar onSubmit={(q) => { setQuery(q); setPage(1); }} />
            </header>

            <main className={styles.container}>
                <div className={styles.main}>
                    {!query ? (
                        <div style={{ textAlign: 'center', padding: 60, color: '#666' }}>
                            Введіть назву фільму у поле пошуку, щоб побачити результати.
                        </div>
                    ) : (
                        <>
                            {isLoading && <Loader />}
                            {error && <ErrorMessage message={error.message} />}

                            {!isLoading && movies.length === 0 && <div>Нічого не знайдено</div>}

                            <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />

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

                            {selectedMovie && (
                                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;