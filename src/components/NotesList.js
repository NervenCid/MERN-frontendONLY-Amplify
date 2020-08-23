//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios'
//Importamos 'timeago' (instalarlo primero, via npm)
//>npm install timeago.js
import {format} from 'timeago.js'
//Importamos 'Link' que permite usar un componente 'Link' 
import { Link } from 'react-router-dom'

//Creamos una 'URL' verificar primero
//Verificar el puerto del servidor en este caso se esta usando el puerto 443
//const URL = 'http://localhost:443';
const URL = '54.185.64.134:443';

//Creamos y exportamos el componente
export default class NotesList extends Component {
    //Creamos un estado
    state = {
        notes: []
    };

    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount() {
        //Obtenemos las notas
        this.getNotes();           
    };

    //Con esta funcion obtenemos las notas disponibles
    async getNotes(){

        //Hacemos peticiones HTTP usando 'axios'
        const res = await axios.get(`${URL}/api/notes`);
        console.log(res.data);
        //Cambiamos el estado
        this.setState({ notes: res.data });     
    };

    //Este metodo sirve para eliminar la nota
    deleteNote = async (noteId)=>{
        //console.log(noteId)
        //Hacemos peticiones HTTP usando 'axios'
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.delete(`${URL}/api/notes/${noteId}`);
        //Actualizamos la interfaz   
        this.getNotes();     
    };

    render() {
        return (
            <div className="row">
                {/*Recorremos los datos almacenados en el 'state'*/}
                {/*No olvidar declarar una 'key'*/}                
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link className="btn btn-secondary" to={"/edit/"+ note._id}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                </div>
                                {/*Boton para borrar la nota*/}
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
