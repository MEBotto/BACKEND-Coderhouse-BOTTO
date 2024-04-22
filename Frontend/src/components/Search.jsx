import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import PropTypes from 'prop-types';

const WAIT_BETWEEN_CHANGE = 300;

export default function Search({ placeholder }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      searchParams.set('query', term);
    } else {
      searchParams.delete('query');
    }

    searchParams.set('page', '1');

    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchTerm}
      />
      <i className="ri-search-line absolute left-3 top-1/3 text-2xl h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
};