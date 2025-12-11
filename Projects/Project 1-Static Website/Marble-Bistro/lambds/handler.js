// handler.js (Node 18.x runtime)
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    // Allow CORS from anywhere — for production restrict to your domain(s)
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

    // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({}) };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, headers, body: JSON.stringify({error: "Missing body"}) };
    }
    const body = JSON.parse(event.body);

    // Basic validation
    if (!body.type || !['booking','order'].includes(body.type)) {
      return { statusCode: 400, headers, body: JSON.stringify({error: "Invalid type"}) };
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
    const item = {
      submissionId: id,
      type: body.type,
      createdAt: body.createdAt || new Date().toISOString(),
      payload: body
    };

    await dynamo.put({
      TableName: TABLE,
      Item: item
    }).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, id })
    };

  } catch (err) {
    console.error('Error saving submission', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error' }) };
  }
};
