import { API } from "../dist/main.es"

test('API.getDict shoulb be a function', () => {
  expect(typeof API.getDict).toBe('function')
})

test('API.test.getDetail shoulb be a function', () => {
  expect(typeof API.test.getDetail).toBe('function')
})

// test('API.test.getDetail shoulb be a function', () => {
//   return API.test.getDetail().then(res => {
//     expect(res).toBe(Error)
//   })
// })

// test('API.getDict shoulb be a function', () => {
//   return API.getDict().then(res => {
//     expect(res).toBe(Error)
//   })
// })
