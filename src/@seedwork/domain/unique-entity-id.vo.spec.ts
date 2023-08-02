import { UniqueEntityId } from "./unique-entity-id.vo"
import { InvalidUuidError } from '../errors/invalid-uuid.error'
import { validate as uuidValidate } from 'uuid'


function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId Unit Test', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = spyValidateMethod()
    expect(() => new UniqueEntityId('fake id'))
      .toThrow(InvalidUuidError)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = spyValidateMethod()
    const uuid = '3001fd65-6987-4faf-8a48-b0a4ece291d9'
    const vo = new UniqueEntityId(uuid)
    expect(vo.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should create a uuid in constructor', () => {
    const validateSpy = spyValidateMethod()
    const vo = new UniqueEntityId()
    expect(uuidValidate(vo.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})