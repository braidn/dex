@aws
runtime nodejs12.x
profile gloss-root
region us-east-1

@app
dex

@http
get /status
post /shipments
post /tracks

@tables
shipments
  shipmentId *String
