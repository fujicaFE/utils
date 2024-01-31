import { Reg } from "../dist/main.es"

// 手机号
test('Reg.phone check 18800001111 should be true', () => {
  expect(Reg.phone.test(18800001111)).toBe(true)
})

test('Reg.phone check 28800001111 should be false', () => {
  expect(Reg.phone.test(28800001111)).toBe(false)
})

// 人名
test('Reg.personName check 张三 should be true', () => {
  expect(Reg.personName.test('张三')).toBe(true)
})

test('Reg.personName check 李 should be false', () => {
  expect(Reg.personName.test('李')).toBe(false)
})

test('Reg.idCard check 440300199901010001 should be true', () => { // 18位
  expect(Reg.idCard.test('440300199901010001')).toBe(true)
})

test('Reg.idCard check 350424870506202 should be true', () => { // 15位
  expect(Reg.idCard.test('350424870506202')).toBe(true)
})

test('Reg.idCard check 440300199921210001 should be true', () => { // 年月不对
  expect(Reg.idCard.test('440300199921210001')).toBe(false)
})