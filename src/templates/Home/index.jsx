//primeiro paramtro da funcao vai ser sempre uma URL ou um OBJETO

import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

const useFetch = (url, options) => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();
  const [shouldLoad, setShouldLoad] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let changed = false;
    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }
    if (changed) {
      setShouldLoad((s) => !s);
    }
  }, [url, options]);

  useEffect(() => {
    let wait = false;
    console.log('effect', new Date().toLocaleString());
    console.log(optionsRef.current.headers);
    setLoading(true);

    const fetchData = async () => {
      // por a funcao ser assincrona, devemos chamar o setTimeout dentro de uma promise
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const response = await fetch(urlRef.current, optionsRef.current);
        const jsonResult = await response.json();
        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (e) {
        if (!wait) {
          setLoading(false);
        }
        throw e;
      }
    };
    fetchData();
    return () => {
      wait = true;
    };
  }, [shouldLoad]);

  return [result, loading];
};

export const Home = () => {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
    headers: {
      abc: '3101' + postId,
    },
  });

  useEffect(() => {
    console.log('id do post', postId);
  }, [postId]);

  if (loading) {
    return <p>Loading... </p>;
  }

  const handleClick = (id) => {
    setPostId(id);
  };

  if (!loading && result) {
    return (
      <div>
        {/*a primeira linha converte para objeto o result?.length */}
        {result?.length > 0 ? (
          result.map((p) => (
            <div key={`post-${p.id}`} onClick={() => handleClick(p.id)}>
              <p>{p.title}</p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>
        )}
      </div>
    );
  }
  return <h1>Oi</h1>;
};
