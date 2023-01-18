import  React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogames, filterByGenres, filterCreater, orderByName, orderByRating } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import style from './Home.module.css'

export default function Home (){
    const dispatch = useDispatch()
    const allVideogames =  useSelector((state) => state.videogames)
    const allGenres= useSelector((state) => state.genres)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getVideogames())
    },[dispatch])

    
    function handleClick(e){
e.preventDefault();
dispatch(getVideogames());
}

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    function handleOrderByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterGenres(e){ 
dispatch(filterByGenres(e.target.value))
setCurrentPage(1);
}

    function handleFilterCreater(e){
        dispatch(filterCreater(e.target.value))
        setCurrentPage(1);
    }


    return(
        <div>
            <div className={style.bg}></div>
            <Link className={style.link} to='/videogame'>Crear videogame</Link>
            <div className={style.titulo}><h1>Videogames App</h1></div>
            <button className={style.boton2} onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los videogames
            </button>
            <div>
                <select className={style.boton2} onChange={e => handleOrderByName(e)}>
                    <option value= 'disabled'>Orden Alfabetico</option>
                    <option value= 'asc'>A - Z</option>
                    <option value= 'desc'>Z - A</option>   
                </select>
                <select className={style.boton2} onChange={e => handleFilterGenres(e)}>
                <option value= 'disabled'>Género</option>
                    <option value="All">Todos</option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Multiplayer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Educational">Educational</option>
                </select>
                <select className={style.boton2} onChange={e => handleFilterCreater(e)}>
                <option value= 'disabled'>Orígen</option>
                    <option value= 'All'>Todos</option>
                    <option value= 'createdInDb'>Creados</option>
                    <option value= 'api'>Existente</option>
                </select>
                <select className={style.boton2} onChange={e => handleOrderByRating(e)}>
                <option value= 'disabled'>Rating</option>
                    <option value="alto">Alto</option>
                    <option value="bajo">Bajo</option>
                </select>
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado = {paginado}
                />
                <SearchBar/>
                <div className={style.card}></div>
               {
               currentVideogames?.map((vg) => {
                return(
                    <div key={vg.id}>
                        <Link to={'/detail/' + vg.id}>
                        <Card 
                        name={vg.name}
                        background_image={vg.background_image}
                        genres={vg.genres}
                        key={vg.id}
                        id={vg.id}
                        />
                        </Link>
                    </div>
                    )
                })
               }
            </div>
        </div>
    )
}
