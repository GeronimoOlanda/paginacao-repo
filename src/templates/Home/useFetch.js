//primeiro parametro da funcao vai ser sempre uma URL ou um OBJETO
// nosso hook
import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const useFetch = (url, options) => {
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
