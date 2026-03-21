// movieService.ts

export interface Movie {
    id: number;
    title: string;
    overview?: string;
    poster_path?: string | null;
}

export interface MoviesResponse {
    page: number;
    total_pages: number;
    results: Movie[];
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // v3 API key (string)
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN; // v4 token (Bearer)
const BASE = 'https://api.themoviedb.org/3';

if (!API_KEY && !READ_ACCESS_TOKEN) {
    console.warn(
        'No TMDB credentials found. Set VITE_TMDB_API_KEY (v3) or VITE_TMDB_READ_ACCESS_TOKEN (v4) in .env',
    );
}

export const fetchMovies = async (page = 1): Promise<MoviesResponse> => {
    const urlBase = `${BASE}/movie/popular?language=en-US&page=${page}`;

    const headers: Record<string, string> = {};
    let finalUrl = urlBase;

    if (API_KEY) {
        finalUrl = `${urlBase}&api_key=${API_KEY}`;
    } else if (READ_ACCESS_TOKEN) {
        headers['Authorization'] = `Bearer ${READ_ACCESS_TOKEN}`;
    } else {
        throw new Error('TMDB credentials are missing. Set VITE_TMDB_API_KEY or VITE_TMDB_READ_ACCESS_TOKEN in .env');
    }

    const res = await fetch(finalUrl, { headers });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText} ${body}`);
    }
    const data = await res.json();
    return data as MoviesResponse;
};

export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
    const q = encodeURIComponent(query.trim());
    const urlBase = `${BASE}/search/movie?language=en-US&query=${q}&page=${page}`;

    const headers: Record<string, string> = {};
    let finalUrl = urlBase;

    if (API_KEY) {
        finalUrl = `${urlBase}&api_key=${API_KEY}`;
    } else if (READ_ACCESS_TOKEN) {
        headers['Authorization'] = `Bearer ${READ_ACCESS_TOKEN}`;
    } else {
        throw new Error('TMDB credentials are missing. Set VITE_TMDB_API_KEY or VITE_TMDB_READ_ACCESS_TOKEN in .env');
    }

    const res = await fetch(finalUrl, { headers });
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText} ${body}`);
    }
    const data = await res.json();
    return data as MoviesResponse;
};