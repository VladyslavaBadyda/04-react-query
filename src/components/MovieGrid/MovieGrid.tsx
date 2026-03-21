import React from 'react';
import styles from './MovieGrid.module.css';
import type { Movie } from '../../services/movieService';

type Props = {
    movies: Movie[];
};

const MovieGrid: React.FC<Props> = ({ movies }) => {
    return (
        <div className={styles.grid}>
            {movies.map((m) => (
                <div key={m.id} className={styles.item}>
                    {m.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w300${m.poster_path}`} alt={m.title} />
                    ) : (
                        <div style={{ height: 300, background: '#ddd' }} />
                    )}
                    <h3>{m.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default MovieGrid;