import React from 'react';
import {ThreeDots} from 'react-loader-spinner';

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        < ThreeDots type='ThreeDots '
        color= '#00BFFF'
        height = {50}
        width = {50

        }
        className='m-5'
        
        />
        <p className='text-lg text-cetner px-2 '>{message}</p>
        </div>
  )
}
export default Spinner