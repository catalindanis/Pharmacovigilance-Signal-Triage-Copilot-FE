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

  rest.post('http://localhost:8000/api/explain', async (req, res, ctx) => {
    const body = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        drug: body.drug,
        start_date: body.start_date,
        end_date: body.end_date,
        signal_count: signalsDemo.signals.length,
        packets: signalsDemo.signals.map((signal, index) => ({
          signal_index: index,
          drug: signalsDemo.drug,
          event: signal.event,
          event_title: signal.event,
          medical_context: `${signal.event} is a clinically relevant adverse event that warrants review in the context of ${signalsDemo.drug}.`,
          statistical_justification: `PRR ${signal.prr} and ROR ${signal.ror} suggest disproportionate reporting.`,
          trend_analysis: signal.trend?.emerging ? `The signal for ${signal.event} appears emerging.` : `The signal for ${signal.event} does not appear emerging.`,
          literature_references: [],
          priority: signal.valid_signal ? 'HIGH' : 'LOW',
          next_steps: 'Review cases and assess causality.',
          markdown: `### Signal ${index + 1}: ${signal.event}\n`,
        })),
      })
    )
  }),
]
