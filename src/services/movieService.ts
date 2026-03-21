// movieService.ts

import axios from 'axios';
import type { Movie } from '../types/movie';

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

const axiosInstance = axios.create({
    baseURL: BASE,
    headers: READ_ACCESS_TOKEN ? { Authorization: `Bearer ${READ_ACCESS_TOKEN}` } : undefined,
});

export const fetchMovies = async (page = 1): Promise<MoviesResponse> => {
    if (!API_KEY && !READ_ACCESS_TOKEN) {
        throw new Error('TMDB credentials are missing. Set VITE_TMDB_API_KEY or VITE_TMDB_READ_ACCESS_TOKEN in .env');
    }

    const params: Record<string, any> = { language: 'en-US', page };
    if (API_KEY) params.api_key = API_KEY;

    const res = await axiosInstance.get<MoviesResponse>('/movie/popular', { params });
    return res.data;
};

export const searchMovies = async (query: string, page = 1): Promise<MoviesResponse> => {
    if (!query.trim()) {
        throw new Error('Query is empty');
    }
    if (!API_KEY && !READ_ACCESS_TOKEN) {
        throw new Error('TMDB credentials are missing. Set VITE_TMDB_API_KEY or VITE_TMDB_READ_ACCESS_TOKEN in .env');
    }

    const params: Record<string, any> = { language: 'en-US', query, page };
    if (API_KEY) params.api_key = API_KEY;

    const res = await axiosInstance.get<MoviesResponse>('/search/movie', { params });
    return res.data;
};