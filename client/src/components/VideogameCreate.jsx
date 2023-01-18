import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogame , getVideogames, } from "../actions/index";
import style from './VideogameCreate.module.css'

function validate(input) {
    let errors = {}
    if(!input.name) {
        errors.name = 'El nombre es requerido'
    }
    if (!input.description) {
        errors.description = "La descripción es requerida"
    }
   if(!input.released){
        errors.released = 'La fecha de lanzamiento es requerida'
    }
    if(!input.rating){
        errors.rating = 'Rating es requerido'
    } 
    else if(input.rating < 0 || input.rating > 5 ) {
        errors.rating = 'Debe ser mayor a 0 y menor o igual a 5'
    }
    if (!input.platforms || input.platforms.length === 0){
        errors.platforms = 'Plataforma es requerida'
    }
    if (!input.genres|| input.genres.length === 0) {
        errors.genres = 'Genero es requerido'
    }
    return errors;
}

export default function VideogameCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state)=> state.genres)
    const games = useSelector(state => state.videogames)
    const [errors, setErrors] = useState({});
    
    

    const [input, setInput] = useState({
        name: "",
        description: "",
        released:"", 
        rating: 0,
        platforms: [], 
        background_image: "",
        genres: []
    })

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect (e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate( {
                ...input,
                genres: [...input.genres, e.target.value],
            }))
    }

    function handleDeleteGenre(e,d){
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== d)
        });
    };

    const handlePlataforms= (e) => {
        setInput({
            ...input,
            platforms:[...new Set([...input.platforms, e.target.value])]
        })
        setErrors(validate( {
            ...input,
            platforms: [...input.platforms, e.target.value],
        }))
    }
    function handleDeletePlatform(e,c){
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== c)
        });
    };

    const setArray = [];
        games.map(e => e.platforms?.map(e => setArray.push(e)));
        let newSet = [...new Set(setArray)];


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("Videogame creado!")
        setInput({
            name: "",
            description: "",
            released:"", 
            rating: 0,
            platforms: [], 
            background_image: "",
            genres: []
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);

    return(
        <div className={style.fondo}>
            <h1  className={style.titulo}>Creá tu videogame!</h1>
            <div className={style.create}>
            <form className={style.content} onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type= "text"
                    value={input.name}
                    name= 'name'
                    placeholder='Nombre...'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (<p className={style.error}>{errors.name}</p>)}
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                    type= "text"
                    value={input.description} 
                    name= 'description'
                    placeholder= 'Descripción...'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.description && (<p className={style.error}>{errors.description}</p>)}
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input 
                    type= "text"
                    value= {input.released}
                    name= 'released'
                    placeholder= 'dd/mm/aaaa'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.released && (<p className={style.error}>{errors.released}</p>)}
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                    type= "number"
                    value= {input.rating}
                    name= 'rating'
                    placeholder='Rating...'
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.rating && (<p className={style.error}>{errors.rating}</p>)}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                    type= "url"
                    value={input.background_image}
                    name='background_image' 
                    placeholder='Imagen...'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Plataformas:</label>
                    <select onChange={(e) => handlePlataforms(e)} >
                        <option value='plat'></option>
                        { newSet.map(e => ( 
                        <option key={e} value={e}>{e}</option>))}
                        </select>
                        {input.platforms.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) => handleDeletePlatform(e, c)}>x</button>
                                </span>
                                )}
                        {errors.platforms && (<p className={style.error}>{errors.platforms}</p>)}                        
                        <ul><li>{input.platforms?.map(e => e + ' ,') }</li></ul>
                </div>
                <label>Géneros: </label>
                    <select onChange={(e)=>handleSelect(e)}>
                    <option value='gen'></option>
                        {genres.map((gen, i) =>(
                            <option key={i} value={gen.name}>{gen.name}</option>
                        ))}
                    </select>
                    {input.genres.map((c,i) =>
                            <span key={i}> {c}
                                <button className={style.eliminar} onClick={(e) =>handleDeleteGenre(e, c)}>x</button>
                                </span>
                                )}
                    {errors.genres && (<p className={style.error}>{errors.genres}</p>)}
                    <ul><li>{input.genres.map(el => el +" ,")}</li></ul>
                    <button type='submit'> Crear videogame</button>
            
            </form>
        </div>
        <br/>
        <br/>
        <Link to= '/home'><button className={style.boton}>Volver</button></Link>
        <br/>
        </div>
    )


}