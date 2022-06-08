import './App.scss';

import { Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Library from './components/Library';
import Book from './components/Book/';

function App() {
  return (
    <div>
      <Navbar />

      <div className="container mt-3 text-center">
        <Switch>
          <Route exact path={["/", "/library"]} component={Library} />
          <Route exact path="/book" component={Book.List} />
          <Route exact path="/book/edit/:bookId" component={Book.Edit} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

