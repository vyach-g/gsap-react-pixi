import React, { useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import PropTypes from "prop-types";
import {
  Stage,
  Container,
  Sprite,
  useTick,
  useApp,
  ParticleContainer
} from "@inlet/react-pixi";
import { SheetSprite, SpriteAnimated } from "./";
import * as TOOLS from "../pixi-utils";
const getTexturesFrom = (resourceKey, from) => {
  console.log("getting textures from", resourceKey, from);
};
const loader = new PIXI.Loader();

const Background = props => {
  const app = useApp();
  const { spritesheet, ...rest } = props;
  const [textures, setTextures] = useState([]);
  useEffect(() => {
    app.stop();
    TOOLS.resolveSpriteSheet(app, spritesheet, data => {
      const textures = Object.keys(data.frames).map(img =>
        PIXI.Texture.from(img)
      );
      setTextures(textures);
      app.start();
    });
    return () => {};
  }, [app]);

  //   console.log("app is", app)
  const paddingY = 136;
  const paddingX = 100;
  const bounds = new PIXI.Rectangle(
    -paddingX,
    -paddingY,
    app.screen.width + paddingX * 2,
    app.screen.height + paddingY * 2
  );
  const childProps = React.Children.toArray(props.children)[0].props;
  const [items, setItems] = useState();
  useEffect(() => {
    setItems(props.motion.setup(100, bounds, childProps));
  }, []);
  useTick(delta => {
    setItems(props.motion.update(items, bounds));
  });
  return (
    textures.length > 0 &&
    React.Children.only(
      <Container position={[0, 0]}>
        {items.map((c, i) => {
          return React.cloneElement(props.children, {
            key: i,
            name: `sprite${i}`,
            spritesheet: spritesheet,
            ...c
          });
        })}
      </Container>
    )
  );
};

Background.propTypes = {};

export default Background;
