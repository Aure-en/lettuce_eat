import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      if (json.error) {
        setError(json.error);
        setCount(0);
      } else {
        setData(json);
        setCount(response.headers.get("count"));
      }
      setLoading(false);
    })();
  }, [url]);

  return {
    data,
    count,
    error,
    loading,
  };
}

export default useFetch;
