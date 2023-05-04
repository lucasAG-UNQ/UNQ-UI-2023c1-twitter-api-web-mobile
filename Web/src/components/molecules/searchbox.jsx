import React, { useState } from 'react';

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Buscando: ${searchText}`)
    console.log(`Buscando: ${searchText}`)
  }

  return (
    <div className="container pt-5">
       <form onSubmit={handleSubmit}>
        <div class="text-center">
          <input 
            type="text" 
            className="form-control mt-5 mb-1" 
            id="searchText" 
            placeholder="..." 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div class="text-center">
          <button type="submit" className="btn btn-primary">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default SearchBox