import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videogameById, cleanDetail } from "../actions/index";
import { useEffect } from "react";
import style from './Detail.module.css'

export default function Detail(){
    const dispatch = useDispatch();
    const{id}=useParams();

    const videogameDetail = useSelector ((state)=> state.detail)

    useEffect(() => {
        dispatch(videogameById(id)); 
        return function()  {
            dispatch(cleanDetail())
        }   
    },[dispatch, id])

    
    return(
        <div className={style.create}>
            {
            videogameDetail.length ?
            <div className={style.content}> 
                <h1 className={style.titulo}>{videogameDetail[0].name}</h1>
                <img  src={videogameDetail[0].background_image} alt='Videogame img' width='400px' height='400px'/>
                <div>{videogameDetail[0].genres?.map(gen => (gen.name ? gen.name : gen)).join(' | ')}</div>
                <div>
               
               <div>Rating: {videogameDetail[0].rating}</div>
               <div>Released: {videogameDetail[0].released}</div>
               <div>Platforms: {(videogameDetail[0].platforms).join(' , ')}</div>
               <div className={style.text}>Description: {videogameDetail[0].description}</div>
            </div>
               </div> : <p>Cargando ...</p>
                }
            <Link to='/home'>
                <button className={style.boton}>Volver</button>
            </Link>
            
        </div>
    )
}



