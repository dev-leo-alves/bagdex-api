import { Entity } from './entity'

class CustomEntity extends Entity<{}> {}

describe('Core Entity', () => {
  test('should generate an ID if not provided', () => {
    const entity = new CustomEntity({})

    expect(entity.id).toBeTruthy()
  })

  test('should use the provided ID if provided as a string', () => {
    const id = "151201-dez"
    const entity = new CustomEntity({}, id)

    expect(entity.id).toEqual(id)
  })

  test('should be able to check equality as a string', () => {
    const id = "151201-dez"
    const entityOne = new CustomEntity({}, id)
    const entityTwo = new CustomEntity({}, id)

    class Another {}
    
    expect(entityOne).not.toEqual(null)
    expect(entityOne).not.toEqual(new Another() as any)

    expect(entityOne).toEqual(entityOne)
    expect(entityOne).toEqual(entityTwo)
  })

  test('should use the provided ID if provided as a number', () => {
    const id = 151201
    const entity = new CustomEntity({}, id)

    expect(entity.id).toEqual(id)
  })

  test('should be able to check equality as a number', () => {
    const id = 151201
    const entityOne = new CustomEntity({}, id)
    const entityTwo = new CustomEntity({}, id)

    class Another {}

    expect(entityOne).not.toEqual(null)
    expect(entityOne).not.toEqual(new Another() as any)

    expect(entityOne).toEqual(entityOne)
    expect(entityOne).toEqual(entityTwo)
  })
})