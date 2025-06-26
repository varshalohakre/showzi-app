import {useState} from 'react';
import {Routes,Route} from 'react-router-dom';
 import { Navbar,Feed,PinDetail,CreatePin,Search } from '../components'; 



const Pins = ({user}) => {
     const [SearchTerm, setSearchTerm] = useState('')
  return (
     <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} user={user}/> 
    </div>
    <div className='h-full'>


      <Routes>
        <Route path="/" element={<Feed/>}/>
        <Route path="/*" element={<Pins user={user}/>}/>
        <Route path="/category/:categoryId" element={<Feed/>}/>
        <Route path="/pin-detail/:pinid" element={<PinDetail user={user}/>}/>
        <Route path="/create-pin" element={<CreatePin user={user} />}/>
        <Route path="/search" element={<Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} />}/>
      </Routes>
    </div>

    </div> 
   
  );
};

export default Pins; 

