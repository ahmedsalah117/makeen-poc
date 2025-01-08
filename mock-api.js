const MOCK_DATA = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  image: `https://via.placeholder.com/50?text=Item+${i + 1}`,
}));

function fetchItems(query, page = 1, pageSize = 20) {
  const filtered = MOCK_DATA.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const start = (page - 1) * pageSize;
  return new Promise((resolve) =>
    setTimeout(() => resolve(filtered.slice(start, start + pageSize)), 300)
  );
}
