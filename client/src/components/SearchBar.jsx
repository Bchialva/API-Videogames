import React from 'react';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../actions';
import style from './SearchBar.module.css'

export default function SearchBar() {
const dispatch = useDispatch()
const [name, setName] = useState('')

function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e) {
    e.preventDefault()
    
    if(name){
    dispatch(getVideogameByName(name))
    setName('')
    }
    
    else{
    alert('No se encontro videogame');
    }
}

return(
    <div>
        <input
        className={style.boton}
        type= 'text'
        placeholder='Buscar...'
        onChange={(e) => handleInputChange(e)}
        />
       <button className={style.boton2} type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
)
}