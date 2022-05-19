import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    (async () => {
      setStatus('pending');
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
          setData(data);
          setError(null);
          setStatus('succeeded');
        }
      } catch (error) {
        setError('Failed in fetching the requested data!');
        setStatus('failed');
      } finally {
        setStatus('idle');
      }
    })();
  }, [url]);

  return { data, error, status };
};
