const endpoint = 'http://localhost:8000';
const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getGames };
