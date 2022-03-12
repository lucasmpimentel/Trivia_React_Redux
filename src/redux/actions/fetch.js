import { setItemToken } from '../../services/syncLocal';

export async function getTokenAPI() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const required = await fetch(url);
  const response = await required.json();
  return response.token;
}

export async function getQuestionsAPI() {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const required = await fetch(url);
  const response = await required.json();
  return response;
}

export async function refreshTokenAPI() {
  const response = await (getQuestionsAPI());
  const { response_code: responseCode, results } = response;
  const responseError = 3;
  const newToken = await getTokenAPI();
  switch (responseCode) {
  case responseError:
    setItemToken(newToken);
    return response;
  default: return results;
  }
}
