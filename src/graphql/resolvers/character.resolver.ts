export const characterResolver = {
  characters: async () => {
    // Por ahora devolvemos un mock
    return [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth'
      }
    ]
  }
}
