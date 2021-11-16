import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef } from 'react';
import P from 'prop-types';

export const Home = () => {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4, 5]);
  const divRef = useRef();

  /*
  //exibe sempre o ultimo elemento
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  });
*/

  // mesma coisa que o useEffect, porem é utilizado por ultimo recurso.
  useLayoutEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  });
  const handleClick = () => {
    setCounted((c) => [...c, +c.slice(-1) + 1]);
  };
  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef} />
    </>
  );
};

export const DisplayCounted = forwardRef(function DisplayCounted({ counted }, ref) {
  return (
    <div ref={ref} style={{ height: '400px', width: '100px', overflowY: 'scroll' }}>
      {counted.map((c) => {
        return <p key={`c-${c}`}>{c}</p>;
      })}
    </div>
  );
});

DisplayCounted.propTypes = {
  counted: P.number,
  divRef: P.func,
};
