// lib/getData.js
export async function getData(endpoint) {
  const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
    method: 'GET',
    cache: 'no-store', // Ensure fresh data on each request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}