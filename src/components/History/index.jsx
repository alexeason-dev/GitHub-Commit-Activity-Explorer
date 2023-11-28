import React from "react";
import HistoryCard from './Card';

const History = () => {
    return (
        <>
        <h3 className="text-gray-400 px-6 text-sm mb-4">Recents</h3>
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={true} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
            <HistoryCard isActive={false} />
        </>
    )
}

export default History;