import * as PIXI from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";
const resolveSpriteSheet = (app, url, cb) => {
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
  // .onProgress.add((loader, resources) => console.log('add progress', loader, resources))
  // .onComplete.add((loader, resources) => console.log('add complete', loader, resources))
};

const applyProps = (
  instance,
  { app, spritesheet, textures, isPlaying, ...props }
) => {
  Object.keys(props).forEach(p => {
    instance[p] = props[p];
  });
  isPlaying
    ? !instance.playing && instance.play()
    : instance.playing && instance.stop();
};

const SpriteAnimated = PixiComponent("SpriteAnimated", {
  create(props) {
    const { app, spritesheet } = props;
    const anim = new PIXI.AnimatedSprite([PIXI.Texture.EMPTY]);
    resolveSpriteSheet(app, spritesheet, data => {
      anim.textures = Object.keys(data.frames).map(img =>
        PIXI.Texture.from(img)
      );
      applyProps(anim, props);
      // anim.play();
    });
    return anim;
  },
  applyProps(ins, _, props) {
    applyProps(ins, props);
  },
  willUnmount(instance) {}
});

export default SpriteAnimated;
