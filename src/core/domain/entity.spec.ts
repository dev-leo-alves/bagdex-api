import { Entity } from './entity'

class CustomEntity extends Entity<{}> {}

describe('Core Entity', () => {
  test('should generate an ID if not provided', () => {
    const entity = new CustomEntity({})

    expect(entity.id).toBeTruthy()
  })

  test('should use the provided ID if provided', () => {
    const id = 1
    const entity = new CustomEntity({}, id)

    expect(entity.id).toEqual(id)
  })

  test('should be able to check equality', () => {
    const id = 1
    const entityOne = new CustomEntity({}, id)
    const entityTwo = new CustomEntity({}, id)

    class Another {}

    expect(entityOne).not.toEqual(null)
    expect(entityOne).not.toEqual(new Another() as any)

    expect(entityOne).toEqual(entityOne)
    expect(entityOne).toEqual(entityTwo)
  })
})