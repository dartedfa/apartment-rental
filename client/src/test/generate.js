import faker from 'faker'

function buildUser(overrides) {
  return {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...overrides,
  }
}

function buildApartment(overrides) {
  return {
    name: faker.lorem.word(),
    desciption: faker.lorem.words(),
    price: faker.random.number(),
    size: faker.random.number(),
    rooms: faker.random.number(),
    longitude: faker.random.float({min: 0, max: 180}),
    latitude: faker.random.float({min: 0, max: 90}),
    realtorFullName: 'John Doe',
    realtorEmail: 'john.doe@gmail.com',
    ...overrides,
  }
}

export {buildUser, buildApartment}
