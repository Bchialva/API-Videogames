const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`); 
    const apiInfo = await apiUrl.data.results.map(el =>{
        return {
            id:el.id,
            name: el.name,
            background_image: el.background_image,
            released: el.released,
            rating: el.rating,
            platforms: el.platforms.map(el => el),
        }
    })
    return apiInfo;
};

const getApiInfo1 = async () => {
    let videogamesArr = [];
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    try {
      for (let i = 0; i < 5; i++) { //me traeo 20 por pagina yp ara traer 100 tengo que pegarle 5 veces
        const apiInfo = await axios.get(apiUrl); 
        apiInfo.data.results 
        .map((el) => {         
            videogamesArr.push({
              id: el.id,
              name: el.name,
              description: el.description_raw,
              image: el.background_image,
              released: e.released,
              rating: el.rating,
              platforms: el.platforms.map((el) => el.platform.name),
              genres: el.genres.map((el) => el.name),
            });
          });
          apiUrl = apiInfo.data.next; //me manda a la otra pagina donde estan los otros 20 juegos
      }
      return videogamesArr; 
    } catch (error) {
      console.log("Couldn't bring info from API", error); 
    }
  }

  const getApiData = async ()=> {
    try {
      let apiDataTotal = [];
      for (let i = 1; i <= 5 ; i++) {
        let apiUrl = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results; 
        apiInfo = apiDataTotal.concat(apiUrl);
      }
      
      const gamesData = apiDataTotal.map( game => {
        return {
          id: game.id,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map( genre => genre),
          createdInDb: false
        }
      });
      console.log('# apiData', gamesData.length);
      return gamesData;
    } catch (error) {
      console.log('Error Controller (APIS):', error.response.status, error.response.statusText, 
      error.response.data.error, error.message );
    }
  };

  const getApiInfo4 = async () => {
    let games=[];
    for(let i=1; i < 6; i++){
        const apiUrl= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}` )
        const apiInfo=apiUrl.data.results;
        const vgames= apiInfo.map(e => {
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

Home.jsx

router.post('/videogames', async (req,res) => {
  const { name, description, released, rating, platforms, background_image, createdInDb, genre} = req.body
  try{
  const videogameCreated = await Videogame.create({
      name,
      description,
      released, 
      rating,
      platforms, 
      background_image,
      createdInDb
  })
     videogameCreated.addGenre(genre)
  res.send(videogameCreated)
} catch (error) {
  console.log(error);
}
});

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