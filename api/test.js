module.exports = async function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  res.json({
    hasKey: !!key,
    keyPrefix: key ? key.slice(0, 10) + '...' : 'NOT SET',
    keyLength: key ? key.length : 0
  });
};
