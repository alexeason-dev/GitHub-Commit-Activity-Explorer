import React from "react";
import GitHubSearch from './views/index';
import RepoProvider from "./context/RepoProvider";

const App = () => {
  return (
    <RepoProvider>
      <GitHubSearch />
    </RepoProvider>
  );
};

export default App;
