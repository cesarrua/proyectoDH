const Genres = require('Genres')
const Movies = require('Movies')

Movies.belongsTo(Genres,{foreignKey:'genre_id'});

module.exports ={
    Genres,
    Movies
}