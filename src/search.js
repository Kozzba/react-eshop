import React from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({searchQuery, setSearchQuery}) => {
    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    }


    return <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="🔍"
            name="s" 
            className="searchInput"
        />
        <button type="submit" style={{
            display: "none"
        }}>Search</button>
    </form>
}

export default SearchBar;