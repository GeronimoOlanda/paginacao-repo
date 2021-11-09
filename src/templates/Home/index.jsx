/* eslint-desable */

//primeiro paramtro da funcao vai ser sempre uma URL ou um OBJETO

import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const jsonResult = await response.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };
  }, [url]);

  return [1, 2];
};
export const Home = () => {
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts');
  console.log(result, loading);
  return <h1>Oi</h1>;
};
