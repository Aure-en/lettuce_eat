import React from "react";
import styled from "styled-components";

function About() {
  return (
    <Container>
      <section>
        <Subheading>Welcome to Lettuce Eat</Subheading>
        <p>
          We created this blog to celebrate how nourishing, fun, and delicious
          cooking with seasonal, fresh ingredients can be. We hope that the
          recipes here inspire you to try cooking a new recipe, or try cooking
          familiar products in a new way.
        </p>
      </section>

      <section>
        <Subheading>Values</Subheading>
        <p>
          When browsing recipes blogs to discover new ways of cooking, we have
          always hated having to scroll through mountains of irrelevant text
          before reaching the actual recipe. We believe that users looking to
          cook a new recipe shouldn't have to click on a "Jump to Recipe"
          button.
        </p>
        <p>
          Because of that, we have decided to include in our posts only what is
          strictly necessary: a list of ingredients, a set of instructions and a
          picture of the final product. There will never be any superfluous
          explanation or any ad.
        </p>
      </section>
    </Container>
  );
}

export default About;

const Container = styled.div`
  & > section {
    margin-bottom: 2rem;
  }

  & p {
    text-indent: 1.5rem;
    text-align: justify;
  }
`;

const Subheading = styled.h2`
  display: inline-block;
  font-size: 0.9375rem;
  font-weight: 400;
  text-transform: uppercase;
  font-style: italic;
  padding: 0.25rem 1.25rem 0.25rem 1rem;
  border-left: 3px solid ${(props) => props.theme.input_border};
  background: ${(props) => props.theme.subheading_bg};
  color: ${(props) => props.theme.text_secondary};
`;
