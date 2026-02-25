const https = require('https');

module.exports = async function handler(req, res) {
  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 100,
    messages: [{ role: 'user', content: 'Say hello' }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    }
  };

  const data = await new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let raw = '';
      response.on('data', chunk => raw += chunk);
      response.on('end', () => resolve({ status: response.statusCode, body: raw }));
    });
    request.on('error', reject);
    request.write(body);
    request.end();
  });

  res.json({ status: data.status, response: JSON.parse(data.body) });
};
