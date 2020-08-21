//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios'
//Importamos 'datepicker' (instalarlo primero, via npm)
//npm install react-datepicker --save
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//Creamos una 'URL' verificar primero
//Verificar el puerto del servidor en este caso se esta usando el puerto 4000
//const URL = 'http://localhost:4000';
const URL = 'http://ec2-34-212-168-1.us-west-2.compute.amazonaws.com:4000';

//Creamos y exportamos el componente
export default class CreateNote extends Component {
    //Creamos un estado
    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date : new Date(),
        editing: false,
        _id: ''
    };

    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount() {       
        
        //Hacemos peticiones HTTP usando 'axios'
        const res_users = await axios.get(`${URL}/api/users`);
        //console.log(res_users);
        //Modificamos el estado
        this.setState({
            users: res_users.data.map(user => user.username),
            userSelected: res_users.data[0].username
        });
        //Si existe 'this.props.match.params.id' quiere decir que
        //lo que hara el usuario es una edicion luego cambiamos
        //el estado en 'editing' a 'true' y asiganmos el 'id'
        //de la nota que se desee editar
        if(this.props.match.params.id){
            //Hacemos una peticion 'get' para llenar el formulario a llenar
            const res_note = await axios.get(`${URL}/api/notes/${this.props.match.params.id}`);
            console.log(res_note.data);
            //Cambiamos el estado
            this.setState({
                title: res_note.data.title,
                content: res_note.data.content,
                date: new Date(res_note.data.date),
                userSelected: res_note.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }; 
    
    //Con este evento escuchamos y cambiamos la fecha en el calendario de 'DatePicker'
    onChangeDate = date => {
        //Cambiamos el estado
        this.setState({date});
    };

    //Con este metodo se guarda la nota
    onSubmit = async (e) => {
        //Evitamos que por defecto se refresque la pagina
        e.preventDefault();
        //Creamos la nota y cambiamos el estado
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        //console.log(newNote);
        //Si el estado 'editing' es 'true' hacemos edicion
        //si no creamos una nueva nota
        //Para EDITAR usamos 'put' y para CREAR usamos 'post'
        if(this.state.editing){
            //Enviamos al backend
            //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
            await axios.put(`${URL}/api/notes/${this.state._id}`, newNote);
        }else{
            //Enviamos al backend
            //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
            await axios.post(`${URL}/api/notes`, newNote);
            //console.log(newNote);
        }
        //Nos ubicamos en la direccion raiz
        window.location.href = '/';
    };

    //Escuchamos cuando se cambie de usuario en la caja desplegable
    //de usuarios en Crear Nota
    onInputChange = (e) => {
        //console.log(e.target.value);
        //Cambiamos el estado
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear una nota</h4>
                    {/*Seleccionar una Lista de todos los usuarios*/}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                        >
                            {/*Recorremos el arreglo 'users' y los agregamos a al elemento 'option'*/}
                            {
                                this.state.users.map(user => 
                                    <option key={user}
                                            value={user}>
                                        {user}
                                    </option>)
                            }
                        </select>
                    </div>
                    {/*Titulo de la nota*/}
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-cpntrol"
                            placeholder="Titulo"
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required
                        />
                    </div>
                    {/*Contenido de la nota*/}
                    <div>
                        <textarea
                            type="text"
                            name="content"
                            className="form-control"
                            placeholder="Contenido de la nota"
                            onChange={this.onInputChange}
                            value={this.state.content}
                            required></textarea>
                    </div>
                    {/*Agregamos un calendario*/}
                    <br></br>
                    <div className="form-group">
                        <DatePicker 
                            className="form-control"
                            selected={this.state.date} 
                            onChange={this.onChangeDate}
                            />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Guardar Nota
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
