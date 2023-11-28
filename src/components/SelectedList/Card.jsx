import React from "react";
import { Trash } from "react-feather";
import DeleteModal from "../common/DeleteModal";
import { useState } from "react";
import { useRepoProvider } from "../../context/RepoProvider";

const RepoCard = ({ repo, repoColor }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeRepo } = useRepoProvider();

  return (
    <>
      <div className="bg-[#16191c] text-white rounded flex items-center h-20">
        <span className={`h-20 rounded-l w-5 mr-2`} style={{ backgroundColor: repoColor }}></span>
        <div className="p-3 w-full flex justify-between">
          <h1>{repo.name.split('/').map((part, i) => (
            <span key={i}>
              {i > 0 && ' / '} {i === 1 ? <b>{part}</b> : <span className='text-gray-200'>{part}</span>}
            </span>
          ))}</h1>
          <Trash
            onClick={() => {
              setShowDeleteModal(true);
            }}
            className="cursor-pointer hover:text-white text-gray-500"
          />
        </div>
        {showDeleteModal && (
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => {
              removeRepo(repo.name)
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default RepoCard;
