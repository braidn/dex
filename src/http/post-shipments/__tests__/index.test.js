const sandbox = require("@architect/sandbox")
const arc = require('@architect/functions')
const test = require("tape")
const tiny = require('tiny-json-http')
const data = require('./fixtures')

let db // Database Connection
let end // Server Connection

test('arc.start', async t => {
  t.plan(1)
  end = await sandbox.start()
  db = await arc.tables()
  t.ok(true, 'Sandbox Started')
})

test('POST /shipments response', async t => {
  t.plan(2)

  tiny.post({
    url: "http://localhost:3333/shipments",
    data: data
  }, (err, result) => {
    if (err) throw err
    t.ok(result, 'Successful Result Received')
    t.ok(result.headers['location'], 'Location of Shipment Returned')
  })
})

test('POST /shipments data', async t => {
  t.plan(1)

  result = await db.shipments.get({
    shipmentId: data.number,
    type: "Shipment"
  })
  t.ok(result, "Shipment Persisted Successfully")
})

test('arc.end', async t => {
  t.plan(1)
  await end()
  t.ok(true, 'Sandbox Closed')
})
