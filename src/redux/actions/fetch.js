const url = 'https://opentdb.com/api_token.php?command=request';
const getTokenAPI = async () => {
  const required = await fetch(url);
  const response = await required.json();
  return response.token;
};
export default getTokenAPI;
