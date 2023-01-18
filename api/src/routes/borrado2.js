const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Videogame, Genre }= require('../db');
const { json } = require('body-parser');
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    let games=[];
    for(let i=1; i < 6; i++){
        const apiUrl= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}` )
        const apiInfo=apiUrl.data.results;
         apiInfo.map(e => {
            games.push({
                id:e.id,
                name:e.name,
                description: e.description,
                background_image:e.background_image,
                rating:e.rating,
                released:e.released,
                platforms: e.platforms.map((e) => e.platform.name),
                genres: e.genres.map((gen) => {
                    return gen.name
                }),
            })      
        })
    } return games
}


const getDbInfo = async () => {
    return await Videogame.findAll({
        include : {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}



const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/videogames', async (req, res) => {
    const name = req.query.name
    const videogamesTotal = await getAllVideogames();
    if(name){
        const videogameName = videogamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        videogameName.length ?
        res.status(200).send(videogameName) :
        res.status(404).send("Not found...");
    }else{
        res.status(200).send(videogamesTotal)
    }
})

router.get('/genres', async (req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres =  genresApi.data.results.map(el => el.name)
    
        genres.forEach(el =>{
            Genre.findOrCreate({
                where: {name: el}
            })
        })
        const allGenres = await Genre.findAll();
        res.send(allGenres);
})

router.post('/videogames', async (req,res) => {
    const{
        name,
        description,
        background_image,
        rating,
        released,
        platforms,
        genres
    }=req.body;
  
  let objInfo={ name, description, background_image: background_image ? background_image : 'https://img.freepik.com/vector-gratis/consola-juegos-letras-letrero-neon-fondo-ladrillo_1262-11854.jpg?w=740&t=st=1669172056~exp=1669172656~hmac=e28863c9e27bdca4a8f20846ad1f6797d2186e727160fc3c0d2e98242bbe8dc8',rating,released,platforms}
    try{
            const videogameCreate= await Videogame.create(objInfo);
            let videogameGenre= await Genre.findAll({
            where: {name: genres}
        });
        await videogameCreate.addGenre(videogameGenre)
        return res.status(201).send('Creado')
    } catch (error) {
        res.status(400).json(error);
    }
  })

router.get('/videogame/:id', async (req,res) => {
    const {id} = req.params       
    const videogamesTotal = await getAllVideogames()
    if(id) {
        const videogameId = videogamesTotal.filter(el => el.id == id)
        videogameId.length ?
        res.status(200).json(videogameId) :
        res.status(404).send('Videogame no encontrado')
    }
})



module.exports = router;
