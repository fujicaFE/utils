import { typeOf } from "../dist/main.es"

test('typeOf shoulb be a Function', () => {
    expect(typeof typeOf).toBe('function')
})

test('typeOf 123 should be Number', () => {
    expect(typeOf(123)).toBe('Number')
})

test('typeOf "abc" should be String', () => {
    expect(typeOf('abc')).toBe('String')
})