import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {

  const [params] = useSearchParams();

  return (
    <>
      <h1>Buscador</h1>
      <div>{params.getAll('q')}</div>
    </>
  )
}

export default Search