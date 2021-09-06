import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

const renderers = {
  inline: {
    BOLD: (children) => <strong key={uniqid()}>{children}</strong>,
    ITALIC: (children) => <em key={uniqid()}>{children}</em>,
    UNDERLINE: (children) => <u key={uniqid()}>{children}</u>,
    CODE: (children) => (
      <span key={uniqid()} className="code">
        {children}
      </span>
    ),
    HEADING: (children) => (
      <div className="heading" key={uniqid()}>
        {children}
      </div>
    ),
    SUBHEADING: (children) => (
      <div className="subheading" key={uniqid()}>
        {children}
      </div>
    ),
    STRIKETHROUGH: (children) => (
      <span key={uniqid()} className="strikethrough">
        {children}
      </span>
    ),
  },
  blocks: {
    unstyled: (children) => children.map((child) => (
      <p key={uniqid()} className="block">
        {child}
      </p>
    )),
    codeBlock: (children) => children.map((child) => (
      <pre key={uniqid()} className="codeBlock">
        {child}
      </pre>
    )),
    quoteBlock: (children) => children.map((child) => (
      <div key={uniqid()} className="quoteBlock">
        {child}
      </div>
    )),
    'unordered-list-item': (children) => (
      <ul key={uniqid()}>
        {children.map((child) => (
          <li key={uniqid()}>{child}</li>
        ))}
      </ul>
    ),
    'ordered-list-item': (children) => (
      <Ol key={uniqid()}>
        {children.map((child) => (
          <li key={uniqid()}>{child}</li>
        ))}
      </Ol>
    ),
  },
  entities: {
    LINK: (children, data) => (
      <Link key={uniqid()} href={data.url}>
        {children}
      </Link>
    ),
  },
};

export default renderers;

const Ol = styled.ol`
  & li {
    margin-bottom: 1rem;
  }

  & li:last-child {
    margin-bottom: 0;
  }
`;
