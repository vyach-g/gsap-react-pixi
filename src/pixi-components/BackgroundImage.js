import React, { useCallback, useState, useEffect } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite, TilingSprite, useApp } from "@inlet/react-pixi";

const BackgroundImage = props => {
  const { ...spriteProps } = props;
  // hooks
  const app = useApp();
  const [sprite, setSprite] = useState(null);
  const [container, setContainer] = useState(null);
  const [baseTexRect, setBaseTexRect] = useState(() => new PIXI.Rectangle());
  const [parentRect, setParentRect] = useState(() => new PIXI.Rectangle());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [newProps, setNewProps] = useState({ ...spriteProps });
  const [didMount, setDidMount] = useState(null);
  const [containerDidMount, setContainerDidMount] = useState(null);
  // init the sprite
  const r_sprite = useCallback(ref => {
    console.log("3 Sprite is", ref.parent.width, ref.parent.height, ref); // 3
    const {
      texture: { baseTexture },
      parent: { x, y, width, height }
    } = ref;
    // ref.parent.once("added", parent => console.lcg("parent ADDED", parent));
    // ref.once("added", container => console.log("container ADDED", container));
    const baseRect = new PIXI.Rectangle(
      0,
      0,
      baseTexture.width,
      baseTexture.height
    );
    const parentR = new PIXI.Rectangle(x, y, width, height);
    console.log("parentR", parentR);
    let ratio;
    if (parentR.height / parentR.width < baseRect.height / baseRect.width) {
      console.log("wider");
      // parent is wider
      ratio = parentR.width / baseRect.width;
    } else {
      console.log("taller");
      // base is wider
      ratio = parentR.height / baseRect.height;
    }
    // setScale({x: ratio, y: ratio})
    // setBaseTexRect(baseRect);
    setParentRect(parentR);
    setNewProps({
      ...props,
      tileScale: { x: ratio, y: ratio }
      // width: app.screen.width,
      // height: app.screen.width
    });
    setSprite(ref);
  }, []);
  const rContainer = useCallback(ref => {
    setContainer(ref);
    console.log("2 rContainer callback", ref); // 2
  }, []);
  useEffect(() => {
    if (container && containerDidMount) {
      console.log("4 container effect", container); // 4
    }
  }, [container, containerDidMount]);

  useEffect(() => {
    console.log("sprite useEffect()");
    if (didMount && sprite) {
      const { texture } = sprite;
      console.log("sprite", texture.width, texture.baseTexture.width);
      console.log("app", app, props, sprite);
    }
  }, [sprite, didMount]);
  console.log("baseRect", baseTexRect);
  console.log("newProps", newProps);
  console.log("didMount", didMount);
  return (
    <Container
      width={parentRect.width}
      height={parentRect.height}
      ref={containerDidMount && rContainer}
      didMount={() => setContainerDidMount(true)}
    >
      <TilingSprite
        width={parentRect.width}
        height={parentRect.height}
        ref={didMount && r_sprite}
        {...newProps}
        didMount={(a, b, c) => {
          console.log("1 sprite didMount", didMount); // 1
          setTimeout(() => setDidMount(true), 500);
        }}
        // tileScale={scale}
        // tilePosition={{ x: 0, y: 0 }}
      />
    </Container>
  );
};

export default BackgroundImage;
