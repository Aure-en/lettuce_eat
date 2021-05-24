import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Nav from "./components/header/Nav";
import All from "./routes/All";
import Categories from "./routes/Categories";
import Category from "./routes/Category";
import Ingredient from "./routes/Ingredient";
import Main from "./routes/Main";
import NotFound from "./routes/NotFound";
import Post from "./routes/Post";
import Message from "./routes/Message";
import MessagePanel from "./components/message/Panel";
import About from "./routes/About";
import AboutPanel from "./components/about/Panel";
import theme from "./styles/theme";
import "./styles/textEditor.css";
import "normalize.css";

function App() {
  return (
    <Router basename="/lettuce_eat">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header>
            <Nav />
          </Header>
          <AboutPanel />
          <Content>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/categories" component={Categories} />
              <Route
                exact
                path={["/categories/:category", "/categories/:category/:page"]}
                component={Category}
              />
              <Route
                exact
                path={[
                  "/ingredients/:ingredient",
                  "/ingredients/:ingredient/:page",
                ]}
                component={Ingredient}
              />
              <Route
                exact
                path={["/recipes", "/recipes/:page"]}
                component={All}
              />
              <Route exact path="/posts/:postId" component={Post} />
              <Route exact path="/message" component={Message} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <MessagePanel />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  min-height: 100vh;

  @media all and (min-width: 768px) {
    display: grid;
    grid-template: auto 1fr / 6rem 1fr 6rem;
  }
`;

const Header = styled.header`
  @media all and (min-width: 768px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (min-width: 768px) {
    grid-column: 2;
    grid-row: 2;
    padding: 0 1rem;
  }
`;
