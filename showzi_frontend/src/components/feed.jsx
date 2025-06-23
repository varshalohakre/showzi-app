import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from "../utlis/data";



const Feed = () => {
  const [loading, setLoading] = useState(false);
   const [pins, setpins] = useState(null)
  const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true);
    if(categoryId){
      console.log("inside feed useffect")
      const query = searchQuery(categoryId);
     
     
      client.fetch(query)
      .then((data) =>  {
        setpins(data);
        console.log(data,"khikhi")
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery)
         .then((data) => {
           setpins(data);
           console.log(data)
           setLoading(false);
         } )
    }
  }, [categoryId])
  
  if(loading) return <Spinner message="Adding new ideas to your feed!" />
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/> }
      </div>
  )
}
     

export default Feed
