import React, { FunctionComponent } from 'react';
import { default as ResetCSS } from '../components/reset';

const IndexPage: FunctionComponent = () => {
  return (
    <h1>
      Hello Next.js 👋
      <ResetCSS />
    </h1>
  );
};

export default IndexPage;
