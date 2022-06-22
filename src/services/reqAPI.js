async function reqAPI(type) {
  const endpoint = `https://www.the${type.split('s')[0]}db.com/api/json/v1/1/search.php?s=`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
}

export default reqAPI;
