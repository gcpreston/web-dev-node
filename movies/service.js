const dao = require('./dao')

module.exports = (app) => {
  const findAllMovies = (req, res) =>
    dao.findAllMovies()
      .then(movies => res.json(movies));

  app.get("/rest/movies", findAllMovies);

  const deleteMovie = (req, res) =>
    dao.deleteMovie(req.params.id)
      .then((status) => res.send(status));

  app.delete("/rest/movies/:id", deleteMovie);

  const createMovie = (req, res) =>
    dao.createMovie(req.body)
      .then((insertedMovie) => res.json(insertedMovie));

  app.post("/rest/movies", createMovie);

  const findMovieById = (req, res) =>
    dao.findMovieById(req.params.id)
      .then(movie => res.json(movie));

  app.get("/rest/movies/:id", findMovieById);

  const updateMovie = (req, res) =>
    dao.updateMovie(req.params.id, req.body)
      .then(status => res.send(status));

  app.put("/rest/movies/:id", updateMovie);
};
