export const validateCustomPorts = (ports) => {
  if (!ports) return [];
  const valid = [];
  for (const item of ports.split(",")) {
    const p = item.trim();
    if (!p || p.includes("-")) continue;
    const port = Number(p);
    if (port >= 1 && port <= 65535 && Number.isInteger(port)) valid.push(port);
  }
  return Array.from(new Set(valid)).sort((a, b) => a - b);
};
