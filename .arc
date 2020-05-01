@aws
runtime nodejs12.x

@app
dex

@http
get /status
post /shipments
post /tracks

@tables
shipments
  shipmentId *String
  createdAt **Number

# @aws
# profile default
# region us-west-1
