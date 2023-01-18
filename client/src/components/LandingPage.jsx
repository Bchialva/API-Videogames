import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'


export default function LandingPage (){
    return(
        <div className={style.container}>
        <div className={style.bg}>
            <h1 className={style.title}>Bienvenidos a Videogames App</h1>
            <Link to='/home'>
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
        </div>
    )
}