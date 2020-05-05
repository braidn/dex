// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http (req) {
  let arc = require('@architect/functions')
  const db = await arc.tables()
  const body = arc.http.helpers.bodyParser(req)

  await db.shipments.put({
    shipmentId: body.number,
    createdAt: new Date().toISOString(),
    data: {
      ...body
    }
  })

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'location': `/shipments/${body.number}`
    },
    statusCode: 201,
  }
}
