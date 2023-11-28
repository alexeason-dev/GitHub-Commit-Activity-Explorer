import React, { useState, useEffect } from 'react';
import RepoProvider, { useRepoProvider } from '../../context/RepoProvider';
import axios from 'axios';
import { SearchRepoService } from '../../services';
import Suggestions from './Suggestions';
import Spinner from '../../assets/svgs/Spinner';
import Search from '../../assets/svgs/Search';

const useGitHubRepoSearch = () => {
  const [value, setValue] = useState('');
  const { repos, isLoading, isError } = SearchRepoService(value);

  const onInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  return {
    value,
    repos,
    isLoading,
    isError,
    onInputChange,
    setValue
  };
};

const fetchCommitsData = async (repoName) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const timestamp = oneYearAgo.toISOString();

    const { data: commitsData } = await axios.get(`https://api.github.com/repos/${repoName}/commits`, {
      params: {
        since: timestamp,
      },
    });

    return commitsData;
  } catch (error) {
    console.error('Error fetching commits data:', error);
    throw error;
  }
};

const GitHubRepoSearch = () => {
  const { value, repos, isLoading, isError, onInputChange, setValue } = useGitHubRepoSearch();
  const { repositories, setRepositories } = useRepoProvider();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching data:', isError);
    }
  }, [isLoading, isError]);

  const getSuggestions = () => {
    return repos.map((repo) => repo.name);
  };

  const onSuggestionClick = (suggestion) => {
    setValue(suggestion);
  };

  const handleRepositories = async () => {
    const selectedRepo = repos.find((repo) => repo.name === value);

    if (selectedRepo) {
      if (!repositories.some((existingRepo) => existingRepo.name === selectedRepo.name)) {
        try {
          const commitsData = await fetchCommitsData(selectedRepo.name);
          setRepositories((prevReps) => [...prevReps, { name: selectedRepo.name, data: commitsData }]);
        } catch (error) {
          console.error('Error adding repository:', error);
        }
      } else {
        console.log('Repository already added:', selectedRepo.name);
      }
    }
  };

  return (
    <RepoProvider>
      <div>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <Search />
          </div>
          <input
            type="search"
            value={value}
            onChange={onInputChange}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Repositoies..."
            required
          />
          <button
            type="submit"
            onClick={handleRepositories}
            className="flex items-center justify-center w-[70px] text-white absolute end-2.5 bottom-2.5 bg-[#2b3137] hover:bg-[#46494d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[blue-600] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <div role="status" className="flex items-center space-x-2">
                <Spinner />
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Add'
            )}
          </button>
        </div>
        {value !== '' && !isLoading && (
          <Suggestions
            suggestions={getSuggestions()}
            onSuggestionClick={onSuggestionClick}
            isLoading={isLoading}
          />
        )}
      </div>
    </RepoProvider>
  );
};

export default GitHubRepoSearch;
