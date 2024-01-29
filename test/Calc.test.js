import { Calc } from "../dist/main.es"

test('plus shoulb be a Function', () => {
    expect(typeof Calc.plus).toBe('function')
})

test('plus(1, 2) should be 3', () => {
    expect(Calc.plus(1, 2)).toBe(3)
})

test('plus(0.1, 0.2) should be 0.3', () => {
    expect(Calc.plus(0.1, 0.2)).toBe(0.3)
})