import useSWRMutation from 'swr';
import axios from 'axios';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const FetchRepository = (name) => {
  const { data, error, isValidating, trigger } = useSWRMutation(
    `https://api.github.com/repos/${name}/commits`,
    fetcher
  );

  return {
    data: data,
    isLoading: isValidating,
    isError: error,
    trigger: trigger
  };
};

export default FetchRepository;
