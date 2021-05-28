import {useState, useEffect} from 'react'

export default function useFetch(url, method = null) {

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        let isMounted = true;
        setisLoading(true);

        fetch(url)
        .then(res=> res.json() )
        .then(res => {
            console.log("url: ",res);
            setError(null);
            setData(res);
        })
        .catch(err=>{
          console.log(err);
          setError("Something went wrong");
         
        })
        .finally(()=> isMounted && setisLoading(false))
  
        return () => {
          isMounted = false;
          console.log("Unmount call");
        }
      }, [url])

    //   return

    return { data, isLoading, error };
}
