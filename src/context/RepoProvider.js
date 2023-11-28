import { createContext, useState, useContext } from 'react';

const initialContextValues = {
  repositories: [],
  repoColors: [],
  setRepoColors: () => {},
  setRepositories: () => {},
  handleSelectRepo: () => {},
  removeRepo: () => {},
};

const RepoContext = createContext(initialContextValues);

RepoContext.displayName = 'RepoContext';

const RepoProvider = ({ children }) => {
  const [repositories, setRepositories] = useState([]);
  const [repoColors, setRepoColors] = useState([]);

  const handleSelectRepo = (repoObj) => {
    setRepositories([...repositories, repoObj]);
  };

  const removeRepo = (repoName) => {
    setRepositories((prevRepositories) => prevRepositories.filter((repo) => repo.name !== repoName));
    setRepoColors((prevColors) => {
      const { [repoName]: removedColor, ...restColors } = prevColors;
      return restColors;
    });
  };

  const RepoContextValue = {
    repositories,
    repoColors,
    setRepoColors,
    setRepositories,
    handleSelectRepo,
    removeRepo,
  };

  return <RepoContext.Provider value={RepoContextValue}>{children}</RepoContext.Provider>;
};

RepoContext.displayName='RepoProvider';
export const useRepoProvider = () => {
    const value = useContext(RepoContext)
    if (value === undefined) {
        throw new Error('No Provider Found')
    }
    return value
}

export default RepoProvider;