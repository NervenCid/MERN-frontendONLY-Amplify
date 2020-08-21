//Importamos React
import React, { Component } from 'react'
//Importamos 'Link' que permite usar un componente 'Link' que permite usar el
//enrutador de React en lugar del 'href'
import {Link} from 'react-router-dom';
//Creamos y exportamos el componente
export default class Navigation extends Component {
    render() {
        return (
            //En caso de usar bootstrap cambiar los atributos HTML a JSX
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Aplicación de Notas
                </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Notas</Link>                                
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Crear Nota</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Crear Usuario</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
