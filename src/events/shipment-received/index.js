// learn more about event functions here: https://arc.codes/primitives/events
exports.handler = async function subscribe (event) {
  const arc = require('@architect/functions')
  const https = require('https')

  const options = {
    hostname: 'warehouse1.com',
    port: 443,
    path: '/addShipment',
    method: 'POST',
    headers: {
      'AUTHORIZATION': 'BYTE ME',
      "CONTENT-TYPE": 'application/jsoon'
    }
  }

  const shipIt = async ((_req, _context) => {
    const r = https.request(options, res => {
      console.log(res)
      res.on('data', async data => {
        const db = await arc.tables()

        db.shipments.put({
          shipmentId: event.shipmentId,
          type: "Status/Init",
          createdAt: new Date().toISOString(),
          ...data
        })
      })
    })

    res.on('error', (e) => {
      console.log(e)
    })

    r.write(event.data)
    r.end()
  })

  arc.http.async(shipIt)
  return
}
