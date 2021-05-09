import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Posts from "./routes/Posts";
import Categories from "./routes/Categories";
import Category from "./routes/Category";
import Main from "./routes/Main";
import NotFound from "./routes/NotFound";
import Post from "./routes/Post";
import "normalize.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/categories" component={Categories} />
        <Route path="/categories/:category" component={Category} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:postId" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
