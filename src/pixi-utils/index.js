export const resolveSpriteSheet = (app, url, cb) => {
  if (app.loader.loading) {
    app.loader.onComplete.add(() => {
      loadSpritesheet(app, url, cb);
    });
  } else {
    loadSpritesheet(app, url, cb);
  }
};
const loadSpritesheet = (app, url, cb) => {
  app.loader.resources[url]
    ? cb(app.loader.resources[url].data)
    : app.loader.add(url).load((_, resources) => cb(resources[url].data));
};
