import {useState, useEffect} from 'react'

export default function useFetch(url) {

    const [data, setData] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
      
        fetch(url)
        .then(res=> res.json() )
        .then(res => {
            console.log("url: ",res);
            setisLoading(false);
            setError(null);
            setData(res);
        })
        .catch(err=>{
          console.log(err);
          setisLoading(false);
          setError("Something went wrong");
         
        })
  
        return () => {
          console.log("Unmount call");
        }
      }, [url])

    //   return

    return { data, isLoading, error };
}
