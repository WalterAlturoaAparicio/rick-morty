import { Character } from '../database/models/character.model'
import { Op } from 'sequelize'

export class CharacterRepository {
  async findByFilter(filter: any) {
    const where: any = {}

    if (filter) {
      if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` }
      if (filter.status) where.status = { [Op.iLike]: filter.status }
      if (filter.species) where.species = { [Op.iLike]: filter.species }
      if (filter.gender) where.gender = { [Op.iLike]: filter.gender }
      if (filter.origin) where.origin = { [Op.iLike]: `%${filter.origin}%` }
    }

    return Character.findAll({ where })
  }
}
