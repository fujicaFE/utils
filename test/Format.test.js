import { Format } from "../dist/main.es"

test('Format.money shoulb be a Function', () => {
    expect(typeof Format.money).toBe('function')
})

test('Format.money(1500, true) should be 1.5', () => {
    expect(Format.money(1500, true)).toBe(1.5)
})

test('Format.money(3500, true, "￥") should be ￥3.5', () => {
    expect(Format.money(3500, true, '￥')).toBe('￥3.5')
})