require("dotenv").config()
const Airtable = require("airtable")
var jwt = require("jsonwebtoken")
const jwksClient = require("jwks-rsa")
const { promisify } = require("util")

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)
const table = base(process.env.AIRTABLE_TABLE_NAME)
let signingKey
const client = jwksClient({
  cache: true, // Default Value
  cacheMaxEntries: 5, // Default value
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

exports.handler = async (event, context, callback) => {
  try {
    user = await checkHeaderForValidToken(event.headers)
  } catch (err) {
    console.error(err)
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err }),
    }
  }

  const body = JSON.parse(event.body)
  let statusCode = 200
  let returnBody = {}
  if (!body.name || !body.handle || !body.tags) {
    statusCode = 403
    returnBody = {
      msg: "Each influencer must include a name, handle, and tags",
    }
  } else {
    try {
      const record = await table.create(body)
      returnBody = { record }
    } catch (err) {
      console.error(err)
      statusCode = 500
      returnBody = { msg: "Failed to create record in Airtable" }
    }
  }
  return {
    statusCode,
    body: JSON.stringify(returnBody),
  }
}

const checkHeaderForValidToken = async (headers) => {
  const rawAuthorizationHeader = headers["authorization"]

  if (!rawAuthorizationHeader) {
    throw "Unauthorized. No access token included"
  }

  const accessToken = rawAuthorizationHeader.split(" ")[1]
  if (!accessToken) {
    throw "Unauthorized. Token is invalid."
  }

  if (!signingKey) {
    const getSigningKey = promisify(client.getSigningKey)
    try {
      const key = await getSigningKey(process.env.AUTH0_KEY_ID)
      signingKey = key.getPublicKey()
    } catch (err) {
      console.error(err)
      throw "Failed to verify key"
    }
  }

  try {
    var decoded = jwt.verify(accessToken, signingKey)
  } catch (err) {
    console.error(err)
    throw err.message
  }

  if (!decoded) {
    throw "Failed to verify token"
  }
  return decoded
}
