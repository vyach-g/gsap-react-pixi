import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { AnimatedSprite, useApp } from "@inlet/react-pixi";
import * as TOOLS from "../pixi-utils";
// const resolveSpriteSheet = (app, url, cb) => {
//   if (app.loader.loading) {
//     app.loader.onComplete.add(() => {
//       loadSpritesheet(app, url, cb);
//     });
//   } else {
//     loadSpritesheet(app, url, cb);
//   }
// };
// const loadSpritesheet = (app, url, cb) => {
//   app.loader.resources[url]
//     ? cb(app.loader.resources[url].data)
//     : app.loader.add(url).load((_, resources) => cb(resources[url].data));
// };
const SheetSprite = React.forwardRef((props, ref) => {
  const app = useApp();
  const { spritesheet, ...rest } = props;
  console.log("rest", rest);
  const [textures, setTextures] = useState();
  useEffect(() => {
    TOOLS.resolveSpriteSheet(app, spritesheet, data => {
      const textures = Object.keys(data.frames).map(img =>
        PIXI.Texture.from(img)
      );
      setTextures(textures);
      // applyProps(anim, props);
      // anim.play();
    });
  }, []);

  return textures ? (
    <AnimatedSprite ref={ref} textures={textures} {...rest} />
  ) : null;
});

export default SheetSprite;
