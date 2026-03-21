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
