const Airtable = require("airtable")
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)
const table = base(process.env.AIRTABLE_TABLE_NAME)

exports.handler = async (event, context, callback) => {
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
