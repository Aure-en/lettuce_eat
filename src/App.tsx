import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Nav from './components/header/Nav';
import AboutPanel from './components/about/Panel';
import MessagePanel from './components/message/Panel';
import theme from './styles/theme';
import './styles/textEditor.css';
import 'normalize.css';

const All = lazy(() => import('./routes/All'));
const Categories = lazy(() => import('./routes/Categories'));
const Category = lazy(() => import('./routes/Category'));
const Ingredient = lazy(() => import('./routes/Ingredient'));
const Main = lazy(() => import('./routes/Main'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Post = lazy(() => import('./routes/Post'));
const Message = lazy(() => import('./routes/Message'));
const About = lazy(() => import('./routes/About'));

function App() {
  return (
    <Router basename="/berrycious">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header>
            <Nav />
          </Header>
          <AboutPanel />
          <Content>
            <Suspense fallback={<></>}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/categories" component={Categories} />
                <Route
                  exact
                  path={['/categories/:category', '/categories/:category/:page']}
                  component={Category}
                />
                <Route
                  exact
                  path={[
                    '/ingredients/:ingredient',
                    '/ingredients/:ingredient/:page',
                  ]}
                  component={Ingredient}
                />
                <Route
                  exact
                  path={['/recipes', '/recipes/:page']}
                  component={All}
                />
                <Route exact path="/posts/:postId" component={Post} />
                <Route exact path="/message" component={Message} />
                <Route exact path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
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
