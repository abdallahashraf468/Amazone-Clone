import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductsData } from '../firebase/getProducts';
import { getSearchData } from '../firebase/getSearchResults';
import SearchResultBox from '../components/SearchResultsBox';
import FilterPanel from '../components/filterPanel/FilterPanel';


const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSearchData(searchQuery, setSearchResults, setLoading);
  }, [searchQuery])

  return (
    <div>
      <h2>Search Results for: {searchQuery}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <div className='container mx-0'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-4'>
              <FilterPanel/>
            </div>
            <div className='flex justify-evenly col-span-8'>
              {searchResults.map((result, index) => (
                <SearchResultBox key={index} result={result} className='' />
                // Customize this based on your actual data structure
              ))}
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default SearchResults;