import './App.css';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './app/store';
import { ConnectedRouter } from 'connected-react-router';
import Navbar from './components/Navbar';
import RecipeShow from './components/RecipeShow';
import RecipeForm from './components/RecipeForm';
import Recipes from './components/Recipes';
import { ReactReduxContext } from 'react-redux';

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <Router basename="/recipes">
          <div>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path="/" component={Recipes} />
                <Route exact path='/new' component={RecipeForm}/>
                <Route exact path='/:recipeId' component={RecipeShow}/>
              </Switch>
            </Container>
          </div>
        </Router>
      </ConnectedRouter>
    </div>
  );
}

export default App;
