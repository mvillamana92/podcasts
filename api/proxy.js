export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "Missing url param" });
    return;
  }
  try {
    const fetchRes = await fetch(url);
    const data = await fetchRes.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy error" });
  }
}
