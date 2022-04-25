import React from 'react';

export const Error = ({ error }:any)=> {
  if (!error) return null;
  return <p style={{ color: '#F31', margin: '.4rem 0' }}>{error}</p>;
}
