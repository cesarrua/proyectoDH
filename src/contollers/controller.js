const { check, validationResult } = require("express-validator");
const { Movies, Genres } = require("../../models/index");

const searcMovies = async (req, res) => {
  const [movies] = await Promise.all([Movies.findAll()]);

  return res.render("home", {
    movies,
  });
};

const movieCreateRender = async (req, res) => {
  const [genre] = await Promise.all([Genres.findAll()]);

  return res.render("movies/movieCreate", {
    genre,
    errores: [],
  });
};

const newMovie = async (req, res) => {
  // Validacion
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [genre] = await Promise.all([Genres.findAll()]);

    return res.render("movies/movieCreate", {
      genre,
      errores: resultado.array(),
    });
  }

  // Crear un registro
  const {
    title,
    rating,
    awards,
    release_date,
    length,
    genre: genre_id,
  } = req.body;

  try {
    const newMovie = await Movies.create({
      title,
      rating,
      awards,
      release_date,
      length,
      genre: genre_id,
    });

    const { id } = newMovie;
    res.redirect(`/movies/movieDetail/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const movieDetailRender = async (req, res) => {
  const { id } = req.params;

  const movie = await Movies.findByPk(id, {
    include: [{ model: Genres, as: "genre" }],
  });

  if (!movie) {
    return res.redirect("/");
  }

const [genre] = await Promise.all([Genres.findAll()]);

  return res.render(`movies/movieDetail`, {
    movie,
    genre,
    errores: [],
  });
};

const movieEditRender = async (req, res) => {
  const { id } = req.params;

  const movie = await Movies.findByPk(id, {
    include: [{ model: Genres, as: "genre" }],
  });

  if (!movie) {
    return res.redirect("/");
  }

  const [genre] = await Promise.all([Genres.findAll()]);

  return res.render(`movies/movieEdit`, {
    movie,
    genre,
    errores: [],
  });
};

const movieEdit = async (req, res) => {
  const { id } = req.params;

  const movie = await Movies.findByPk(id);
  if (!movie) {
    return res.redirect("/");
  }

  // Validaciones
  await check("title")
    .notEmpty()
    .withMessage("El titulo de la pelicula no puede estar vacio")
    .run(req);
  await check("rating")
    .notEmpty()
    .withMessage("El rating de la pelicula no puede estar vacio")
    .run(req);
  await check("awards")
    .notEmpty()
    .withMessage("El awards de la pelicula no puede estar vacio")
    .run(req);
  await check("release_date")
    .notEmpty()
    .withMessage("El release_date de la pelicula no puede estar vacio")
    .run(req);
  await check("length")
    .notEmpty()
    .withMessage("El length de la pelicula no puede estar vacio")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [genre] = await Promise.all([Genres.findAll()]);

    return res.render(`movies/movieEdit`, {
      movie,
      genre,
      errores: resultado.array(),
    });
  }

  try {
    const {
      title,
      rating,
      awards,
      release_date,
      length,
      genre: genre_id,
    } = req.body;

    movie.set({
      title,
      rating,
      awards,
      release_date,
      length,
      genre_id,
    });

    await movie.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const movieDelete = async (req, res) => {
  const { id } = req.params;

  const movie = await Movies.findByPk(id);

  if (!movie) {
    return res.redirect("/");
  }

  try {
    await movie.destroy({
      force: true,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searcMovies,
  movieCreateRender,
  newMovie,
  movieEditRender,
  movieDetailRender,
  movieEdit,
  movieDelete,
};
