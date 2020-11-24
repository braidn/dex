const test = require("tape");
const sandbox = require("@architect/sandbox");
const handler = require("../index.js").handler;
const nock = require("nock");
const arc = require("@architect/functions");
const warehouseResponse = {
  message: "POST shipment - success",
};

const message = {
  shipmentId: "H111222333",
};

const event = {
  Records: [{ Sns: { Message: message } }],
};

let db;
let end;

nock("https://warehouse1.com/")
  .post("/addShipment")
  .reply(201, warehouseResponse)
  .persist();

test("arc.start", async (t) => {
  t.plan(1);
  end = await sandbox.start();
  db = await arc.tables();
  t.ok(true, "Sandbox Started");
});

test("Handler sends data to warehouse", async (t) => {
  t.plan(1);
  const result = await handler(event);

  console.log(result)
  t.equal(result.statusCode, 201, "Shipment Pushed To Warehouse Successfully");
});

test("On Success: Persists Status on Shipment ID", async (t) => {
  t.plan(1);
  const result = await db.shipments.get({
    shipmentId: message.shipmentId,
    type: "Status/Init",
  });

  t.ok(result, "Shipment Status Persisted");
});

test("arc.end", async (t) => {
  t.plan(1);
  await end();
  t.ok(true, "Sandbox Closed");
});
