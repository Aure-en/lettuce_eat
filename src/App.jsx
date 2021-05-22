import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/header/Header";
import All from "./routes/All";
import Categories from "./routes/Categories";
import Category from "./routes/Category";
import Ingredient from "./routes/Ingredient";
import Main from "./routes/Main";
import NotFound from "./routes/NotFound";
import Post from "./routes/Post";
import theme from "./styles/theme";
import "./styles/textEditor.css";
import "normalize.css";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />
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
              <Route path="/posts/:postId" component={Post} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;

const Container = styled.div`
  border-left: 5rem solid ${(props) => props.theme.background_tertiary};
  border-right: 5rem solid ${(props) => props.theme.background_secondary};
  min-height: 100vh;
`;

const Content = styled.div``;
