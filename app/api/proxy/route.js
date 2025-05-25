// app/api/proxy/route.js
export async function POST(req) {
  const body = await req.json();

  try {
    const response = await fetch('http://130.238.27.123/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch prediction' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
