import React from "react";
import style from './Card.module.css'



export default function Card({name, background_image,genres}) {

    return (
        
        <div className={style.container}>
            <div>
            <div className={style.name}><h3>{name}</h3></div>
            <div className={style.image}><img  src={background_image} alt='img not found' width='270px' height='260px'/></div>
            <div className={style.types}>
                {genres?.map((e,i) => {
                    return <h5 key={i}>{e}</h5>
                })}
            </div>
            </div>
            </div>
            
        
    )
}