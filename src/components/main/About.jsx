import React from "react";
import styled from "styled-components";

function About() {
  return (
    <Container>
      <Logo>
        <Image src="https://www.dropbox.com/s/s3px837esg6dk9s/rsz_hermes-rivera-ozble_eg1mg-unsplash.jpg?raw=1" />
      </Logo>
      <div>
        <Title>
          <Heading>Berrycious</Heading>
          <Subheading>Recipes, and recipes only.</Subheading>
        </Title>
        <p>
          Improve your cooking repertoire with simple, <em>delicious</em>{" "}
          recipes.
        </p>
        <p>
          We take pride in only displaying a preview image, a list of{" "}
          <Underline>
            <em>ingredients</em>
          </Underline>{" "}
          and a set of <strong>instructions</strong>.
        </p>
        <p>
          There will <Underline>never</Underline> be any superfluous paragraph
          explaining why we love making that recipe on rainy spring afternoons
          or anything similar.
        </p>
      </div>
    </Container>
  );
}

export default About;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  text-align: center;
`;

const hexagon = `
  width: 10rem;
  height: 12.5rem;
  clip-path: polygon(
    50% 0%,
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%
  );
`;

const Logo = styled.div`
  position: relative;
  margin-top: 5rem;
  &:before,
  &:after {
    content: "";
    position: absolute;
    ${hexagon}
    top: -2.5rem;
    z-index: -1;
  }

  &:before {
    background: ${(props) => props.theme.background_secondary};
    left: -2.5rem;
  }

  &:after {
    background: ${(props) => props.theme.background_tertiary};
    right: -2.5rem;
  }
`;

const Image = styled.img`
  position: relative;
  ${hexagon}
  object-fit: cover;
`;

const Title = styled.div`
  position: relative;
`;

const Heading = styled.h1`
  font-weight: 300;
  font-size: 3rem;
  margin: 0;
  line-height: 3rem;
  color: ${(props) => props.theme.text_secondary};
`;

const Subheading = styled.div`
  position: relative;
  font-size: 1.25rem;
  font-weight: 300;
  background: -webkit-linear-gradient(
    ${(props) => `${props.theme.gradient_primary} 15%,
    ${props.theme.gradient_secondary} 70%,
    ${props.theme.gradient_tertiary} 100%`}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media all and (min-width: 576px) {
    left: 3rem;
    top: -0.25rem;
  }
`;

const Underline = styled.span`
  text-decoration: underline;
`;
