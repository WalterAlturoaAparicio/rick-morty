import express from 'express'
import { CharacterService } from '../character/character.service'

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
 *     responses:
 *       200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */
router.get('/', async (req, res) => {
  const { name, status } = req.query
  try {
    const characters = await service.getCharacters({ name, status })
    res.json(characters)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener personajes' })
  }
})

export default router
