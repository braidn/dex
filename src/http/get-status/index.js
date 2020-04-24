// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http (req) {
  let status = 200

  return {
    headers: {
      'cache-control': "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      'content-type': "application/json; charset=utf8"
    },
    statusCode: status,
    body: JSON.stringify({
      statusCode: status
    })
  }
}
