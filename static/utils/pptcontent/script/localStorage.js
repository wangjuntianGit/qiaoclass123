const storage = (() => {
  const localStorage = window.localStorage;
  const prefix = 'qiaoClass:';

  return {
    setItem(key, val) {
      try {
        localStorage.setItem(prefix + key, val);
      } catch (e) {
        console.log('catch setItem error:', e);
      }
    },
    getItem(key) {
      try {
        return localStorage.getItem(prefix + key);
      } catch (e) {
        console.log('catch getItem error:', e);
        return '{}';
      }
    },
    removeItem(key) {
      try {
        localStorage.removeItem(prefix + key);
      } catch (e) {
        console.log('catch removeItem error:', e);
      }
    },
  };
})();

export default storage;
