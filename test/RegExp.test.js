import { Reg } from "../dist/main.es"

// 手机号
test('Reg.phone check 18800001111 should be true', () => {
  expect(Reg.phone.test(18800001111)).toBe(true)
})

test('Reg.phone check 28800001111 should be false', () => {
  expect(Reg.phone.test(28800001111)).toBe(false)
})

// 人名
test('Reg.personname check 张三 should be true', () => {
  expect(Reg.personname.test('张三')).toBe(true)
})

test('Reg.personname check 李 should be false', () => {
  expect(Reg.personname.test('李')).toBe(false)
})
