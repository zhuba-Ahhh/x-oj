export function getQuery(key: string) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function getQueryJsonInfo(key: string) {
  const queryInfo = getQuery(key) || '{}';
  let queryInfoObj = {
    [key]: '',
  };

  try {
    if (queryInfo) {
      queryInfoObj = JSON.parse(queryInfo);
    }
  } catch (error) {
    console.log(error);
  }

  return queryInfoObj;
}