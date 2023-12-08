export function Article(title, img) {
  function toString() {
    return JSON.stringify({
      title: this.title,
      img: this.img,
      createdAt: this.createdAt.toJSON(),
    }, null, 2);
  }

  return {
    title,
    img,
    createdAt: new Date(),
    toString,
  };
}
