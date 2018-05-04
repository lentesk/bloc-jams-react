import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
//import '/assets/jamesonlogo.png'


class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
         <div className="pinkheader">
          <nav>
            <Link to='/'><span class="ion-planet"></span></Link>
            <Link to='/library'><span class="ion-navicon-round"></span></Link>
           </nav>
          <img src='/assets/images/jamesonlogo.png' alt="jamesonlogo" />
          </div>
       </header>
       <main>
         <Route exact path="/" component={Landing} />
         <Route path="/library" component={Library} />
         <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
