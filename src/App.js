import './App.css';
import MovieList from './pages/MovieList';
import PageNotFound from './pages/page-not-found';
import MovieDetail from './pages/MovieDetail'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function App() {

  return (
    <Router>
            <div>
                {/*barre de navigation*/}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Films</Link>
                    </div>
                </nav>
                {/*système de gestion des routes*/}
                <Switch>
                    <Route exact path="/" component={MovieList} />
                    <Route exact path="/movies" component={MovieList} />
                    <Route path="/movies/:id" component={MovieDetail} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </Router>
  );
}

export default App;
