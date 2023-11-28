import React, { useEffect } from 'react';
import { useState } from 'react';
import { GitHub } from 'react-feather';
import Sidebar from '../layouts/Sidebar';
import Navbar from '../layouts/Navbar';
import GitHubRepoSearch from '../components/Search';
import useTransformCommit from '../hooks/useTransformCommit';
import SelectedReposList from '../components/SelectedList';
import { Tab, Tabs } from '../components/common/Tabs';
import Chart from '../components/Chart';
import History from '../components/History';
import { sentimentAnalysis } from '../services/SentimentAnalysis';

const CommitComparisonView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getChartData } = useTransformCommit();

  return (
    <>
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}>
          <>
            <Tabs>
              <Tab label={'Search'}>
                <div className='px-6 pb-4 mt-4'>
                  <GitHubRepoSearch />
                  <SelectedReposList />
                </div>
              </Tab>
              <Tab label={'History'}>
                <History />
              </Tab>
            </Tabs>
          </>
        </Sidebar>
        <Navbar setSidebarOpen={setSidebarOpen}>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center justify-right gap-x-4'>
              <GitHub />
              <h1 className='font-bold'>GitHub Commit Comparison Tool</h1>
            </div>
            <div>
              <button
                type="button"
                className="rounded-full bg-[#2b3137] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                New Comparison
              </button>
            </div>
          </div>
        </Navbar>
        <main className="py-10 lg:pl-[400px]">
          <div className="px-4 sm:px-6 lg:px-8">
            <Chart data={getChartData()} />
          </div>
        </main>
    </>
  );
};

export default CommitComparisonView;
