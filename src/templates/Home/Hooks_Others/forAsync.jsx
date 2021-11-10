import { useState, useEffect, useCallback } from 'react';
import { useAsync } from '../useAsync';

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
