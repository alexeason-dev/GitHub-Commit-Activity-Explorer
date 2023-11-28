import { useState, useEffect } from 'react';
import { generateRandomColor } from '../utils/ChartUtils';
import { useRepoProvider } from '../context/RepoProvider';

const useTransformCommit = () => {
  const { repositories, repoColors, setRepoColors } = useRepoProvider()
  const [commitsByWeek, setCommitsByWeek] = useState([]);

  useEffect(() => { 
    if (repositories && repositories.length > 0) {
      const newCommitsByWeek = repositories.map((repo) => {
        const updatedCommits = repo.data.reduce((result, commit) => {
          const authorDate = new Date(commit.commit.author.date);
          const weekStart = new Date(authorDate);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekStartISOString = weekStart.toISOString().split('T')[0];

          if (!(weekStartISOString in result.week)) {
            result.week[weekStartISOString] = [];
          }

          result.week[weekStartISOString].push(commit);
          return result;
        }, { name: repo.name, week: {} });

        if (!repoColors[repo.name]) {
          setRepoColors((prevColors) => ({ ...prevColors, [repo.name]: generateRandomColor() }));
        }

        return updatedCommits;
      });

      setCommitsByWeek(newCommitsByWeek);
    }
  }, [repositories, repoColors, setRepoColors]);

  const getChartData = () => {
    const datasets = commitsByWeek.map((commitByWeek) => {
      const labels = Object.keys(commitByWeek.week);
      const data = labels.map((date) => commitByWeek.week[date].length);

      return {
        label: commitByWeek.name,
        data,
        borderColor: repoColors[commitByWeek.name],
        tension: 0.1,
      };
    });

    return {
      labels: datasets.length > 0 ? Object.keys(datasets[0].data || {}).map((date, index) => `Week ${index + 1}`) : [],
      datasets,
    };
  };

  return { getChartData };
}

export default useTransformCommit;
