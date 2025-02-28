import { useEffect, useState } from "react";

const useFetch=(url)=>{

    const [data, setData] = useState(null);
    const [isPending,setPending]=useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const abortCont=new AbortController();
        fetch(url,{signal:abortCont.signal})
        .then(response=>{
            if(!response.ok){
                throw Error("could not fetch data for that resource");
            }
            return response.json();
        })
        .then(
            data=>{
                setData(data);
                setPending(false);
                setError(null);
            }
        )
        .catch((err)=>{
            if(err.name==="AbortErr") {
                console.log(err);
            }else{
                setError(err.message);
                setPending(false);
            }
        });
        return ()=> abortCont.abort();
    },[url]);

    return {data,isPending,error};

}
export default useFetch;