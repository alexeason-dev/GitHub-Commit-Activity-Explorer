import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const SearchRepository = (query) => {
  const { data, error, isValidating } = useSWR(
    `https://api.github.com/search/repositories?q=${query}`,
    fetcher
  );

  return {
    repos: data ? data.items.map((repo) => ({
      name: repo.full_name,
      url: repo.html_url,
    })) : [],
    isLoading: isValidating,
    isError: error,
  };
};

export default SearchRepository;
