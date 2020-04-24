let sandbox = require("@architect/sandbox")
let test = require("tape")
let tiny = require('tiny-json-http')
let end

test('arc.start', async t => {
  t.plan(1)
  end = await sandbox.start()
  t.ok(true, "Server Started")
})

test("GET /status", t => {
  t.plan(1)
  tiny.get({
    url: "http://localhost:3333/status"
  },
  function _get(err, result) {
    if(err) throw err
    t.ok(result.body.statusCode, 'statusCode Received')
  })
})

test('arc.end', t => {
  t.plan(1)
  end()
  t.ok(true, "Server Closed")
})
