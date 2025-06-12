import React, {useState} from 'react';
import {Routes,Route} from 'react-router-dom';
/* import { Navbar,Feed,PinDetail,CreatePin,Search } from '../components'; */
// In your Pins component, replace the import with:
import Navbar from '../components/navbar';
import Feed from '../components/feed';
import PinDetail from '../components/pindetail';
import CreatePin from '../components/createpin';
import Search from '../components/search';


const Pins = ({user}) => {
  console.log("Pins component loaded!");
     const [searchTerm, setsearchTerm] = useState('')

  return (
   /*  <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
    </div>
    <div className='h-full'>
      <Routes>
        <Route path="/" element={<Feed/>}/>
        
        <Route path="/category/:categoryId" element={<Feed/>}/>
        <Route path="/pin-detail/:pinid" element={<PinDetail user={user}/>}/>
        <Route path="/create-pin" element={<CreatePin user={user}/>}/>
        <Route path="/search" element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />}/>
      </Routes>
    </div>

    </div> */
    <div>
      <h1>Pins Component is Working!</h1>
    
    </div>

  );
};

export default Pins; 

