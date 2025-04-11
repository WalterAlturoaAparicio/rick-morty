'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Characters', [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Summer Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Female',
        origin: 'Earth (Replacement Dimension)',
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Beth Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Female',
        origin: 'Earth (Replacement Dimension)',
        image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Jerry Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (Replacement Dimension)',
        image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Abadango Cluster Princess',
        status: 'Alive',
        species: 'Alien',
        gender: 'Female',
        origin: 'Abadango',
        image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Abradolf Lincler',
        status: 'unknown',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (Replacement Dimension)',
        image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Adjudicator Rick',
        status: 'Dead',
        species: 'Human',
        gender: 'Male',
        origin: 'unknown',
        image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Agency Director',
        status: 'Dead',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (Replacement Dimension)',
        image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Alan Rails',
        status: 'Dead',
        species: 'Human',
        gender: 'Male',
        origin: 'unknown',
        image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Albert Einstein',
        status: 'Dead',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Alexander',
        status: 'Dead',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Alien Googah',
        status: 'unknown',
        species: 'Alien',
        gender: 'unknown',
        origin: 'unknown',
        image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'Alien Morty',
        status: 'unknown',
        species: 'Alien',
        gender: 'Male',
        origin: 'unknown',
        image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'Alien Rick',
        status: 'unknown',
        species: 'Alien',
        gender: 'Male',
        origin: 'unknown',
        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Characters', {}, {})
  }
}
