import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      console.log(response.headers.get('count'));
      console.log(json);
      if (json.error) {
        setError(json.error);
        setLoading(false);
      } else {
        setData(json);
        setLoading(false);
      }
    })();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}

export default useFetch;
