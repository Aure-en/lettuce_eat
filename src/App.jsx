import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header/Header";
import All from "./routes/All";
import Categories from "./routes/Categories";
import Category from "./routes/Category";
import Main from "./routes/Main";
import NotFound from "./routes/NotFound";
import Post from "./routes/Post";
import "normalize.css";

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/categories" component={Categories} />
            <Route path="/categories/:category" component={Category} />
            <Route exact path="/all" component={All} />
            <Route path="/posts/:postId" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div``;

const Content = styled.div``;
