import React, { useEffect } from "react";
import { Trash } from "react-feather";
import DeleteModal from "../common/DeleteModal";
import { useState } from "react";
import { useRepoProvider } from "../../context/RepoProvider";
import { SentimentAnalysisService } from "../../services/index";

const RepoCard = ({ repo, repoColor }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeRepo } = useRepoProvider();
  const [commentEmoji, setCommentEmoji] = useState('');

  useEffect(() => {
    SentimentAnalysisService(repo.name)
      .then((result) => setCommentEmoji(result))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div className="bg-[#16191c] text-white rounded h-30">
        <div className="flex items-center">
          <span className={`h-20 rounded-l w-5 mr-2`} style={{ backgroundColor: repoColor }}></span>
          <div className="p-3 w-full flex justify-between">
            <div className="text-left">
              <h1>{repo.name.split('/').map((part, i) => (
                <span key={i}>
                  {i > 0 && ' / '} {i === 1 ? <b>{part}</b> : <span className='text-gray-200'>{part}</span>}
                </span>
              ))}
              </h1>
              <span className="text-xs text-left">Sentiment: {commentEmoji}</span>
            </div>
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
                removeRepo(repo.name);
                setShowDeleteModal(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RepoCard;
