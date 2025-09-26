import { Format } from "../dist/main.es"

test('Format.money shoulb be a Function', () => {
    expect(typeof Format.money).toBe('function')
})

test('Format.money(150, { yuan: true }) should be 1.5', () => {
    expect(Format.money(150, { yuan: true })).toBe('1.50')
})


test('Format.money(150) should be 150', () => {
    expect(Format.money(150)).toBe('150')
})

test('Format.money(150, { precision: 2 }) should be 150.00', () => {
    expect(Format.money(150, { precision: 2 })).toBe('150.00')
})

test('Format.money(350, { yuan: true, affix: "￥" }) should be ￥3.5', () => {
    expect(Format.money(350, { yuan: true, affix: '￥' })).toBe('￥3.50')
})

test('Format.money(350, { yuan: true, suffix: "元" }) should be ￥3.5', () => {
    expect(Format.money(350, { yuan: true, suffix: '元' })).toBe('3.50元')
})

test('Format.money(undefined) should be undefined', () => {
    expect(Format.money(undefined)).toBe(undefined)
})

test('Format.money(null) should be null', () => {
    expect(Format.money(null)).toBe(null)
})

test('Format.money("未查询") should be null', () => {
    expect(Format.money("未查询")).toBe("未查询")
})