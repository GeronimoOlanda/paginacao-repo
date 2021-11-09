/* eslint-desable */

//primeiro paramtro da funcao vai ser sempre uma URL ou um OBJETO

import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // por a funcao ser assincrona, devemos chamar o setTimeout dentro de uma promise
      await new Promise((r) => setTimeout(r, 3000));

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
