//Importamos React
import React, { Component } from 'react'
//Importamos 'axios' (instalarlo primero, via npm)
import axios from 'axios';

//Creamos una 'URL' verificar primero
//Verificar el puerto del servidor en este caso se esta usando el puerto 443
//const URL = 'http://localhost:443';
const URL = '54.185.64.134:443';

//Creamos y exportamos el componente
export default class CreateUser extends Component {

    //Creamos un estado
    state = {
        users: [],
        username:''
    };

    //Obtenemos los datos de usuario
    //Este metodo ejecuta funciones una vez ha sido montado
    async componentDidMount(){
        //Obtenemos los usuarios
        this.getUsers();
        console.log(this.state.users);        
    };

    //Obtenemos los usuarios con este metodo
    getUsers = async() => {
        //Hacemos peticiones HTTP usando 'axios'
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        const res = await axios.get(`${URL}/api/users`);
        //console.log(res);
        //Almacenamos la propiedad 'data' en el estado
        this.setState({ users: res.data });
    };

    //Escuchamos cuando el usuario escriba
    onChangeUsername = (e) => {
        //console.log(e.target.value);
        //Cambiamos el estado
        this.setState({
            username: e.target.value
        });
    };

    //Este metodo sirve para escuchar el evento del boton 'Guardar'
    onSubmit = async e => {
        //Evitamos que por defecto se refresque la pagina
        e.preventDefault();
        //Hacemos una peticion post para enviar los datos
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.post(`${URL}/api/users`, {
            username: this.state.username
        });
        ////Obtenemos los usuarios para mostrarlos cada vez que sea creado un usuario nuevo
        this.getUsers();
        //Vaciamos la caja de texto
        this.setState({username:''});
    };

    //Borramos el usuario al hacer dobleclick (ver el evento mas abajo)
    deleteUser = async (id) =>{
        //console.log(id)
        //Eliminamos el usuario
        //Verificar el puerto del servidor en este caso se esát usando el puerto 4000
        await axios.delete(`${URL}/api/users/${id}`);
        //Actualizamos la tabla
        this.getUsers();
    };

    render() {
        return (
            <div className = "row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear nuevo usuario</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                    className="form-control" 
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className = "list-group">
                        {/*Recorremos el estado para obtener los usuarios y mostrarlos
                        con el evento 'onDoubleClick' eliminamos el usuario al hacer doble click*/}
                        {
                            this.state
                                .users.map(user => (
                                    <li className="list-group-item list-group-item-action"
                                                    key = {user._id}
                                                    onDoubleClick={() => this.deleteUser(user._id)}>
                                                        {user.username}
                                                    </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
