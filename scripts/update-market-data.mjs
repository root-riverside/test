import { mkdir, writeFile } from 'node:fs/promises';

const assets = [
  { id: 'sp500', symbol: '^GSPC' },
  { id: 'tiger-sp', symbol: '360750.KS' },
  { id: 'usdkrw', symbol: 'USDKRW=X' },
  { id: 'tiger-nasdaq-bond', symbol: '435420.KS' },
];

async function download(asset) {
  const endpoint = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(asset.symbol)}?range=1y&interval=1d&events=history`;
  const response = await fetch(endpoint, { headers: { 'User-Agent': 'Mozilla/5.0 market-compass' } });
  if (!response.ok) throw new Error(`${asset.symbol}: HTTP ${response.status}`);
  const result = (await response.json()).chart?.result?.[0];
  const closes = result?.indicators?.quote?.[0]?.close;
  const timestamps = result?.timestamp;
  if (!closes || !timestamps) throw new Error(`${asset.symbol}: daily close data missing`);
  const rows = closes.map((close, index) => ({ date: new Date(timestamps[index] * 1000).toISOString().slice(0, 10), close }))
    .filter(row => Number.isFinite(row.close));
  if (rows.length < 70) throw new Error(`${asset.symbol}: insufficient daily close data`);
  return { dates: rows.map(row => row.date), closes: rows.map(row => row.close) };
}

const downloaded = await Promise.all(assets.map(async asset => [asset.id, await download(asset)]));
const snapshot = { updatedAt: new Date().toISOString(), source: 'Yahoo Finance chart data', assets: Object.fromEntries(downloaded) };
await mkdir('data', { recursive: true });
await writeFile('data/market.json', `${JSON.stringify(snapshot)}\n`);
console.log(`Updated ${downloaded.length} assets.`);
