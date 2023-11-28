import React from 'react';
import RepoCard from './Card';
import { useRepoProvider } from '../../context/RepoProvider';

const SelectedReposList = () => {

  const { repositories, repoColors } = useRepoProvider()

  return (
    <div className="mb-4 text-center">
      {repositories.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-2 text-white mt-8 mb-5">Selected Repositories</h2>
          <div className='space-y-4'>
            {repositories.map((repo) => (
              <RepoCard key={repo.name} repo={repo} repoColor={repoColors[repo.name]}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedReposList;
