export function getSize(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
      resolve({
        src,
        w: this.width,
        h: this.height,
      });
    };

    img.onerror = () => resolve({ src, w: 1, h: 1 });
  });
}

export default async (src) => {
  if (typeof src === "string") {
    const image = await getSize(src);
    return [image];
  }

  return Promise.all(
    src.map((item) => {
      if (typeof item === "string") {
        return getSize(item);
      }
      if (!item.w) {
        return getSize(item.src);
      }
      return item;
    })
  );
};
