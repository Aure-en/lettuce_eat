import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>();
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      if (json.error) {
        setError(json.error);
        setCount(0);
      } else {
        setData(json);
        setCount(parseInt(response.headers.get('count') || '', 10));
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
