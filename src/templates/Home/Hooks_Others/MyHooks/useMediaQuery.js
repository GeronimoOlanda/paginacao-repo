import { useState, useEffect } from 'react';
const useMediaQuery = (queryValue) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);

    const handleChange = () => {
      if (!isMounted) return;
      setMatch(Boolean(matchMedia.matches));
    };
    matchMedia.addEventListener('change', handleChange);
    setMatch(!!matchMedia.matches);

    //funcao executada quando o componente desmonta
    return () => {
      isMounted = false;
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [queryValue]);
  return match;
};
export const Home = () => {
  const huge = useMediaQuery('(min-width: 980px)');
  let background = huge ? 'green' : null;
  return <h1 style={{ fontSize: '60px', background }}> Ola </h1>;
};
