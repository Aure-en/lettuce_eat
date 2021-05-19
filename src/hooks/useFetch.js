import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(url);
      try {
        // We got the correct response, and received some JSON containing the data.
        const json = await response.json();
        setData(json);
        setLoading(false);
        console.log(json);
      } catch {
        // We got an error as text.
        setError(response);
        setLoading(false);
        console.log(response);
      }
    })();
  }, [url]);

  return {
    data,
    error,
    loading
  };
}

export default useFetch;
