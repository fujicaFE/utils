import { Format } from "../dist/main.es"

test('Format.money shoulb be a Function', () => {
    expect(typeof Format.money).toBe('function')
})

test('Format.money(1500, { yuan: true }) should be 1.5', () => {
    expect(Format.money(1500, { yuan: true })).toBe('1.50')
})

test('Format.money(1500, { precision: 2 }) should be 1.5', () => {
    expect(Format.money(1500, { precision: 2 })).toBe('1500.00')
})

test('Format.money(3500, { yuan: true, affix: "￥" }) should be ￥3.5', () => {
    expect(Format.money(3500, { yuan: true, affix: '￥' })).toBe('￥3.50')
})

test('Format.money(3500, { yuan: true, suffix: "元" }) should be ￥3.5', () => {
    expect(Format.money(3500, { yuan: true, suffix: '元' })).toBe('3.50元')
})

test('Format.money(undefined) should be undefined', () => {
    expect(Format.money(undefined)).toBe(undefined)
})

test('Format.money(null) should be null', () => {
    expect(Format.money(null)).toBe(null)
})