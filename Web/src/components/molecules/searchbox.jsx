import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (searchText){
      navigate(`/search?text=${searchText}`)
    }
  }

  return (
    <div className="container pt-5">
       <form onSubmit={handleSubmitSearch}>
        <div className="text-center">
          <input 
            type="text" 
            className="form-control mt-5 mb-1" 
            id="searchText" 
            placeholder="..." 
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox