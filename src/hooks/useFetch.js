import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      const text = await response.text();
      try {
        // We got the correct response, and received some JSON containing the data.
        const json = JSON.parse(text);
        setData(json);
        console.log(json);
      } catch {
        // We got an error as text.
        setError(text);
        console.log(text);
      }
    })();
  }, [url]);

  return {
    data,
    error,
  };
}

export default useFetch;
