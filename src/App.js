//Importamos React
import React from 'react';
//Importamos el enroutador asegurarse que 'react-router-dom' este instalado
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Importamos 'booststrap' asegurarse que este instalado en 
//la carpeta'node-modules' del proyecto
import 'bootstrap/dist/css/bootstrap.min.css';
//Importamos el estilo css
import './App.css';
//Importamos los componentes
import Navigation from './components/Navigation';
import NoteList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <div>
      <Router>
        <Navigation/>
        <div className="container p-4">
          {/*Creamos las rutas*/}
          {/*Con 'exact' evitamos que se rendericen otras rutas que contengan '/'*/}
          <Route path="/" exact component={NoteList} />
          <Route path="/edit/:id" component={CreateNote} />
          <Route path="/create" component={CreateNote} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>    
    </div>
  );
}

export default App;
