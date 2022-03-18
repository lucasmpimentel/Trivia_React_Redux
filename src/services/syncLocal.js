export const setItemToken = (value) => localStorage.setItem('token', value);

export const setItemPlayer = (value) => localStorage.setItem('player', value);

export const setItemRanking = (value) => localStorage.setItem('ranking', value);

export const getItem = (item) => localStorage.getItem(item);

export default (setItemToken, setItemPlayer, setItemRanking, getItem);
