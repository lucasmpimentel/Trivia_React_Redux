export const setItemToken = (value) => localStorage.setItem('token', value);

export const setItemPlayer = (value) => localStorage.setItem('player', value);

export const getItem = (item) => localStorage.getItem(item);

export default (setItemToken, setItemPlayer, getItem);
