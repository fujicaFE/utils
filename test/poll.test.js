import { poll } from "../dist/main.es"

describe('poll', () => {
  test('poll test shoulb be `185`', async () => {
    const a = await poll({
      requestFn: () => {
        return new Promise((resolve, reject) => {
          resolve('185')
        })
      },
      stopCondition: (res) => {
        return res === '185'
      },
      interval: 1000,
      maxRetries: 2,
    })
    expect(a).toBe('185')
  })
})
