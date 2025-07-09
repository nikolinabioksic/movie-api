const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Dohvati sve žanrove
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Lista svih žanrova
 */
router.get('/', async (req, res) => {
  const genres = await Genre.findAll({ include: Movie });
  res.json(genres);
});

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Dodaj novi žanr
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Žanr kreiran
 */
router.post('/', async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Dohvati žanr po ID-u
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID žanra
 *     responses:
 *       200:
 *         description: Žanr pronađen
 *       404:
 *         description: Žanr nije pronađen
 */
router.get('/:id', async (req, res) => {
  const genre = await Genre.findByPk(req.params.id, { include: Movie });
  if (genre) res.json(genre);
  else res.status(404).json({ error: 'Genre not found' });
});

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Ažuriraj žanr
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID žanra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Žanr ažuriran
 *       404:
 *         description: Žanr nije pronađen
 */
router.put('/:id', async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);
  if (genre) {
    await genre.update(req.body);
    res.json(genre);
  } else res.status(404).json({ error: 'Genre not found' });
});

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Obriši žanr
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID žanra
 *     responses:
 *       200:
 *         description: Žanr obrisan
 *       404:
 *         description: Žanr nije pronađen
 */
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);
  if (genre) {
    await genre.destroy();
    res.json({ message: 'Genre deleted' });
  } else res.status(404).json({ error: 'Genre not found' });
});

module.exports = router;
