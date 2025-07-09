const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Dohvati sve filmove
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista svih filmova
 */
router.get('/', async (req, res) => {
  const movies = await Movie.findAll({ include: Genre });
  res.json(movies);
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Dodaj novi film
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genreId
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               director:
 *                 type: string
 *               genreId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Film kreiran
 */
router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Dohvati film po ID-u
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID filma
 *     responses:
 *       200:
 *         description: Film pronađen
 *       404:
 *         description: Film nije pronađen
 */
router.get('/:id', async (req, res) => {
  const movie = await Movie.findByPk(req.params.id, { include: Genre });
  if (movie) res.json(movie);
  else res.status(404).json({ error: 'Movie not found' });
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Ažuriraj film
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID filma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: integer
 *               director:
 *                 type: string
 *               genreId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Film ažuriran
 *       404:
 *         description: Film nije pronađen
 */
router.put('/:id', async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (movie) {
    await movie.update(req.body);
    res.json(movie);
  } else res.status(404).json({ error: 'Movie not found' });
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Obriši film
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID filma
 *     responses:
 *       200:
 *         description: Film obrisan
 *       404:
 *         description: Film nije pronađen
 */
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (movie) {
    await movie.destroy();
    res.json({ message: 'Movie deleted' });
  } else res.status(404).json({ error: 'Movie not found' });
});

module.exports = router;
