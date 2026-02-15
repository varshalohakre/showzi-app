import React, { useEffect, useState, useCallback } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utlis/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = useCallback(() => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          const morePinsQuery = pinDetailMorePinQuery(data[0]);
          client.fetch(morePinsQuery).then((res) => {
            setPins(res);
          });
        }
      });
    }
  }, [pinId]);

  useEffect(() => {
    fetchPinDetails();
  }, [fetchPinDetails]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <>
      <div
        className="flex xl:flex-row flex-col m-auto bg-white"
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className="flex justify-center items-center md:items-start flex-initial">
          <img
            className="rounded-t-3xl rounded-b-lg"
            src={urlFor(pinDetail.image).url()}
            alt="user-post"
          />
        </div>

        <div className="w-full p-5 flex-1 xl:min-w-620">
          <div className="flex items-center justify-between">
            <a
              href={`${pinDetail.image.asset.url}?dl=`}
              download
              className="bg-secondaryColor p-2 text-xl rounded-full"
            >
              <MdDownloadForOffline />
            </a>

            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination?.slice(8)}
            </a>
          </div>

          <h1 className="text-4xl font-bold mt-3">{pinDetail.title}</h1>
          <p className="mt-3">{pinDetail.about}</p>

          <Link
            to={`/user-profile/${pinDetail.postedBy._id}`}
            className="flex gap-2 mt-5 items-center"
          >
            <img
              src={pinDetail.postedBy.image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">{pinDetail.postedBy.userName}</p>
          </Link>

          <h2 className="mt-5 text-2xl">Comments</h2>

          {pinDetail.comments?.map((item) => (
            <div key={item._key} className="flex gap-2 mt-5 items-center">
              <img
                src={item.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user"
              />
              <div>
                <p className="font-bold">{item.postedBy.userName}</p>
                <p>{item.comment}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <img
              src={user.image}
              className="w-10 h-10 rounded-full"
              alt="user"
            />

            <input
              type="text"
              className="flex-1 border-2 p-2 rounded-2xl"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              onClick={addComment}
              className="bg-red-500 text-white px-6 py-2 rounded-full"
            >
              {addingComment ? 'Doing...' : 'Done'}
            </button>
          </div>
        </div>
      </div>

      {pins?.length > 0 && (
        <>
          <h2 className="text-center font-bold text-2xl mt-8">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
};

export default PinDetail;
