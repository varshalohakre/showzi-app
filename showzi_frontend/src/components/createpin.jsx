import React, { useState } from 'react';
import { client } from '../client'; 

// Categories list
const categories = [
  { name: 'cars' }, { name: 'fitness' }, { name: 'wallpaper' }, { name: 'websites' },
  { name: 'photo' }, { name: 'food' }, { name: 'nature' }, { name: 'art' },
  { name: 'travel' }, { name: 'quotes' }, { name: 'cats' }, { name: 'dogs' },
  { name: 'others' }
];

// Mock Sanity client (replace with real one)

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
  </div>
);

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [fields, setFields] = useState('');
  const [category, setCategory] = useState('');
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
   const [showalert, setshowalert] = useState(false);

   

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/gif', 'image/tiff', 'image/webp'];
    if (allowedTypes.includes(selectedFile.type)) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Upload failed:', error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
      setTimeout(() => setWrongImageType(false), 3000);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const savePin = () => {
    const missingFields = [];

    if (!title.trim()) missingFields.push('Title');
    if (!about.trim()) missingFields.push('Description');
    if (!destination.trim()) {
      missingFields.push('Destination URL');
    } else if (!validateUrl(destination)) {
      setFields('Please enter a valid URL (starting with http:// or https://)');
      setTimeout(() => setFields(''), 4000);
      return;
    }

    if (!imageAsset?._id) missingFields.push('Image');
    if (!category) missingFields.push('Category');

    if (missingFields.length > 0) {
      setFields(`Please fill in the following required fields: ${missingFields.join(', ')}`); //alert for empty details
      setTimeout(() => setFields(''), 4000);
      return;
    }

    const doc = {
      _type: 'pin',
      title: title.trim(),
      about: about.trim(),
      destination: destination.trim(),
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset?._id
        }
      },
      userId: user?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: user?._id
      },
      category
    };

    console.log(doc);
    

    setLoading(true);
    client
      .create(doc)
      .then(() => {
        setTitle('');
        setAbout('');
        setDestination('');
        setCategory('');
        setImageAsset(null);
        setLoading(false);
        setshowalert(true);
        setTimeout(() => setshowalert(false), 4000);
// alert('Pin saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving pin:', error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 min-h-screen bg-gray-50 p-4">
      {fields && (
        <div className="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-2xl">
          <p className="text-center font-medium">{fields}</p>
        </div>
      )}
  {showalert && (
        <div className="mb-5 p-4 bg-green-100 border border-green-400 text-black rounded-lg max-w-2xl">
          <p className="text-center font-medium">{'pin saved successfully!!'}</p>
        </div>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-start bg-white rounded-xl shadow-lg lg:p-8 p-4 lg:w-4/5 w-full max-w-6xl">
        {/* Image Upload */}
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col lg:w-1/2 w-full lg:mr-6 mb-6 lg:mb-0">
          <div className="flex justify-center items-center flex-col border-2 border-dashed border-gray-300 rounded-lg p-6 w-full min-h-[400px] hover:border-gray-400 transition-colors">
            {loading && <Spinner />}

            {wrongImageType && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4">
                <p className="text-center">
                  Please upload a valid image file (PNG, JPG, JPEG, SVG, GIF, TIFF, or WebP)
                </p>
              </div>
            )}

            {!imageAsset?.url && !loading ? (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-xl font-semibold mb-2">Click to upload image</p>
                  <p className="text-sm text-center max-w-xs">
                    Supported formats: JPG, JPEG, PNG, SVG, GIF, TIFF, WebP
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Maximum file size: 20MB</p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ) : (
              imageAsset?.url && (
                <div className="relative w-full h-full min-h-[300px]">
                  <img
                    src={imageAsset.url}
                    alt="uploaded-pic"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                    onClick={() => setImageAsset(null)}
                    title="Remove image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 flex-col gap-6 lg:w-1/2 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title *"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-3 focus:border-red-500 transition-colors"
            maxLength={100}
          />

          {user && (
            <div className="flex gap-3 items-center bg-gray-50 rounded-lg p-3">
              {user?.image ? (
                <img
                  src={user?.image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="user-profile"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <p className="font-semibold text-gray-700">{user?.userName || 'Anonymous User'}</p>
            </div>
          )}

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about *"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-3 focus:border-red-500 transition-colors resize-none"
            rows="3"
            maxLength={500}
          />

          <input
            type="url"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link (https://...) *"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-3 focus:border-red-500 transition-colors"
          />

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-3 font-semibold text-lg text-gray-700">
                Choose Pin Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-full text-base border-2 border-gray-200 p-3 rounded-lg cursor-pointer focus:border-red-500 transition-colors bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.name} className="capitalize">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end items-center mt-4">
              <button
                type="button"
                onClick={savePin}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Pin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
