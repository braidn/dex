// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  let arc = require("@architect/functions");
  const db = await arc.tables();
  const body = arc.http.helpers.bodyParser(req);
  const event = {
    name: "shipment-received",
    payload: { shipmentId: body.number },
  };

  await db.shipments.put({
    shipmentId: body.number,
    type: "Shipment",
    createdAt: new Date().toISOString(),
    ...body,
  });
  await arc.events.publish(event);

  return {
    headers: {
      "content-type": "application/json; charset=utf8",
      location: `/shipments/${body.number}`,
    },
    statusCode: 201,
  };
};
