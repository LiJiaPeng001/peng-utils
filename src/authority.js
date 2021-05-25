const name = "wt_miao";
const maxAge = 1000 * 60 * 60 * 24 * 28;

const authority = {
  get() {
    const data = JSON.parse(window.localStorage.getItem(name)) || { time: 0 };
    if (data.time && Date.now() - data.time >= maxAge) {
      this.clear();
      return {};
    }
    return data;
  },
  set(obj) {
    let user = this.get();
    obj.time = user.time > 0 ? user.time : Date.now();
    obj = JSON.stringify({
      ...user,
      ...obj,
      expires_in: obj.expires_in * 1000 + Date.now(),
    });
    window.localStorage.setItem(name, obj);
  },
  clear() {
    window.localStorage.removeItem(name);
  },
};

export default authority;
