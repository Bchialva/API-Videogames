import React from 'react'
import style from './Paginado.module.css'

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for(let i = 0; i<= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i + 1)
    }
    return(
        <nav>
                {pageNumbers &&
                pageNumbers.map(number => {
                    return (
                    <button className={style.boton} onClick={()=> paginado(number)}>{number}</button>
                    )
                })}
        </nav>
    )
}