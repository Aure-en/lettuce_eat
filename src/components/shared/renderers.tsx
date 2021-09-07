import React from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

const renderers = {
  inline: {
    BOLD: (children: React.ReactNode) => <strong key={uniqid()}>{children}</strong>,
    ITALIC: (children: React.ReactNode) => <em key={uniqid()}>{children}</em>,
    UNDERLINE: (children: React.ReactNode) => <u key={uniqid()}>{children}</u>,
    CODE: (children: React.ReactNode) => (
      <span key={uniqid()} className="code">
        {children}
      </span>
    ),
    HEADING: (children: React.ReactNode) => (
      <div className="heading" key={uniqid()}>
        {children}
      </div>
    ),
    SUBHEADING: (children: React.ReactNode) => (
      <div className="subheading" key={uniqid()}>
        {children}
      </div>
    ),
    STRIKETHROUGH: (children: React.ReactNode) => (
      <span key={uniqid()} className="strikethrough">
        {children}
      </span>
    ),
  },
  blocks: {
    unstyled: (children: React.ReactNode) => {
      if (children && Array.isArray(children)) {
        return children.map((child) => (
          <p key={uniqid()} className="block">
            {child}
          </p>
        ));
      }
    },
    codeBlock: (children: React.ReactNode) => {
      if (children && Array.isArray(children)) {
        return children.map((child) => (
          <pre key={uniqid()} className="codeBlock">
            {child}
          </pre>
        ));
      }
    },
    quoteBlock: (children: React.ReactNode) => {
      if (children && Array.isArray(children)) {
        return children.map((child) => (
          <div key={uniqid()} className="quoteBlock">
            {child}
          </div>
        ));
      }
    },
    'unordered-list-item': (children: React.ReactNode) => (
      <ul key={uniqid()}>
        {children && Array.isArray(children) && children.map((child) => (
          <li key={uniqid()}>{child}</li>
        ))}
      </ul>
    ),
    'ordered-list-item': (children: React.ReactNode) => (
      <Ol key={uniqid()}>
        {children && Array.isArray(children) && children.map((child) => (
          <li key={uniqid()}>{child}</li>
        ))}
      </Ol>
    ),
  },
  entities: {
    LINK: (children: React.ReactNode, data: { url: string }) => (
      <a key={uniqid()} href={data.url}>
        {children}
      </a>
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
