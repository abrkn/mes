const MES_STORAGE_KEY = 'mes-7932a97f';

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || '{}');

Object.assign(state, {
  likedPosts: state.likedPosts || {},
});

console.log({ state });

const saveState = () => {
  localStorage[MES_STORAGE_KEY] = JSON.stringify(state, null, 2);
};

Object.assign(exports, {
  state,
  saveState,
});
