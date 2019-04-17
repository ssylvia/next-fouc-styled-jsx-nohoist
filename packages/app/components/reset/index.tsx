import React from 'react';

export default () => {
  return (
    <style jsx global>{`
      html {
        /* reset font size for styling system */
        font-size: 62.5%;
        padding: 0;
        margin: 0;
      }

      body,
      div,
      ol,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      span,
      figure {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      li {
        text-indent: 0;
        list-style-type: none;
      }

      body,
      input,
      textarea,
      select,
      button {
        font-family: 'Avenir Next', sans-serif;
      }

      img,
      iframe {
        border: 0;
      }

      button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        padding: 0;
      }
    `}</style>
  );
};
