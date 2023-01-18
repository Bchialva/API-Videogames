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


const getDetail = async (id) => {
    let videogameInfo = []
    const apiInfo = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const idGame = await apiInfo.data
    videogameInfo.push({
            name: idGame.name,
            background_image: idGame.background_image,
            rating: idGame.rating,
            released: idGame.released,
            platforms: idGame.platforms?.map((e) => e.platform.name),
            genres: idGame.genres?.map((gen) => gen.name),
            description: idGame.description.replace(/<[^>]*>?/g, ''),
    });
    return videogameInfo
};

const getDbDetail = async (id) => {
        const vgamesdb = await getDbInfo();
        let gamesId = await vgamesdb.filter((gam) => gam.id === id)
        return gamesId
};

const dbApiDetail = async (id) => {
    const idDb = id.includes('-');
    if(idDb) {
        const videogameDb = await getDbDetail(id);
        return videogameDb
    }else{
        const videogameApi = await getDetail(id);
        return videogameApi;
    }
}

const getDbInfo= async () => {
    const resultsDb= await Videogame.findAll({
        include:{
            model:Genre,
            attributes:['name'],
            through: {
                attributes: [],
            },
        }
    })
    const db=resultsDb.map((e) => {
        let allGenre= e.genres.map((gen) => gen.name);
        return{
            id:e.id,
            name:e.name,
            description: e.description,
            background_image:e.background_image,
            rating:e.rating,
            released:e.released,
            platforms: e.platforms,
            genres: allGenre,
        }
    })
    return db
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
    try{
        const{id}=req.params;
        const videogameTodos= await dbApiDetail(id);
        videogameTodos.length? res.status(200).send(videogameTodos) : res.status(404).send('No existe Videogames')
    } catch(error) {
        res.status(400).json(error.message)
    }
})



module.exports = router;
