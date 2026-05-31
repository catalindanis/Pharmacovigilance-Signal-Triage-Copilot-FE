import { rest } from 'msw'
import signalsDemo from './fixtures/signals_demo.json'

export const handlers = [
  rest.get('/api/signals', (req, res, ctx) => {
    // support query params if needed
    return res(ctx.status(200), ctx.json(signalsDemo))
  }),

  rest.get('/api/signals/:event/cases', (req, res, ctx) => {
    const { event } = req.params
    const cases = signalsDemo.signals.find(s => s.event === event)?.cases || []
    return res(ctx.status(200), ctx.json({ event, cases }))
  }),
]
