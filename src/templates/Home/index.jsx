import { useState, useEffect, useCallback } from 'react';

const useAsync = (asyncFnction, shouldRun) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const run = useCallback(() => {
    console.log('EFFECT', new Date().toLocaleString());
    setResult(null);
    setError(null);
    setStatus('pending');

    return asyncFnction()
      .then((response) => {
        setStatus('settled');
        setResult(response);
      })
      .catch((error) => {
        setStatus('error or rejected');
        setError(error);
      });
  }, [asyncFnction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, result, error, status];
};

const fetchData = async () => {
  await new Promise((r) => setTimeout(r, 2000));
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await data.json();
  return json;
};

export const Home = () => {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, true);
  if (status === 'idle') {
    return <pre>Nada Executando</pre>;
  }
  if (status === 'pending') {
    return <pre>Loading...</pre>;
  }
  if (status === 'error') {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if (status === 'settled') {
    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  }
};
