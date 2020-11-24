// learn more about event functions here: https://arc.codes/primitives/events
exports.handler = async function subscribe(event) {
  const arc = require("@architect/functions");
  const got = require('got');

  const events = JSON.stringify(event, null, 2);
  const { Records } = JSON.parse(events);
  const db = await arc.tables();

    const shipIt = async (record) => {
      try {
        const { body } = await got.post("https://warehouse1.com/addShipment",
          {
            json: {
              shipment: record.shipmentId
            },
            responseType: 'json'
          }
        )

        await db.shipments.put({
          shipmentId: record.shipmentId,
          type: "Status/Init",
          createdAt: new Date().toISOString(),
          ...body,
        });
      } catch (e) {
        console.log(e)
      }
    };

    const records = Records.map(async (shipment) => {
      const {
        Sns: { Message: data }
      } = shipment;
      await shipIt(data);
    })

    return await Promise.all(records)
      .then(_result => ({statusCode: 201}))
      .catch(e => ({ statusCode: 404, error: e }))
};
