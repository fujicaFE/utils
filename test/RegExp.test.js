import { RegExp } from "../dist/main.es"

// 手机号
test('RegExp.phone check 18800001111 should be true', () => {
  expect(RegExp.phone.test(18800001111)).toBe(true)
})

test('RegExp.phone check 28800001111 should be false', () => {
  expect(RegExp.phone.test(28800001111)).toBe(false)
})

// 人名
test('RegExp.personname check 张三 should be true', () => {
  expect(RegExp.personname.test('张三')).toBe(true)
})

test('RegExp.personname check 李 should be false', () => {
  expect(RegExp.personname.test('李')).toBe(false)
})
