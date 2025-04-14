import express from 'express'
import { CharacterService } from '../character/character.service'
import { CharacterFilter } from './character-filter.dto'

const router = express.Router()
const service = new CharacterService()

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Obtener personajes con filtros
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del personaje
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Alive, Dead, unknown]
 *         description: Estado del personaje
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Especie del personaje (Human, Alien, etc.)
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Female, Male, Genderless, unknown]
 *         description: Género del personaje
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Dimensión del personaje
 *     responses:
 *        200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 *        500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener personajes
 */

router.get('/', async (req, res) => {
  const { name, status, species, gender, origin }: CharacterFilter = req.query
  try {
    const characters = await service.getCharacters({
      name,
      status,
      species,
      gender,
      origin
    })
    res.json(characters)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener personajes' })
  }
})

export default router
