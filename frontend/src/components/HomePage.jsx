import { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";

function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch(err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);
    const handleSearchClick = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch(err) {
            setError(err);
        }finally {
            setLoading(false);
        }
        setSearchQuery("");
    };                
    return (
        <div className="home-page">
            <form onSubmit={handleSearchClick} className="search-form">
                <input type="text" placeholder="search movies" className="search-input"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading</div> : <div className="movies-grid">
                {movies.map((movie)=> (<MovieCard movie={movie} key={movie.title} />))}
            </div>}
            
        </div>
    )
}

export default HomePage;