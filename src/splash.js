import React, { useEffect, useCallback } from "react";
import * as PIXI from "pixi.js";
import { TweenLite, Bounce, TweenMax } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import { Stage, Container, Sprite, AppConsumer } from "@inlet/react-pixi";
import {
  SheetSprite,
  SpriteAnimated,
  Background,
  BackgroundImage
} from "./pixi-components";
import { whiteBox } from "./tweens";
import { TweenLiter } from "./gsap-components";
import { Random, Linear } from "./motions";
import { Imgur } from "./utils";
PixiPlugin.registerPIXI(PIXI);
const spritesheet =
  "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";
const spritesheet2 =
  "https://pixijs.io/examples/examples/assets/spritesheet/mc.json";
const sky = "https://i.imgur.com/7J8zcuz.png";
const Splash = props => {
  const r_sprite1 = useCallback(node => whiteBox(node), []);
  const r_fighter = useCallback(node => {
    console.log("ref", node);
    TweenMax.to(node, 5, { pixi: { y: -240 } });
  }, []);
  const r_fighter2 = useCallback(node => {
    console.log("ref", node);
    TweenMax.to(node, 5, { pixi: { y: -40 } });
  }, []);

  const { showSprite, playSprite, playPixi } = props.data;
  // console.log("showsprite", showSprite);
  // console.log("playsprite", playSprite);
  // PIXI.Loader.shared.onComplete.add((a, b, c) => console.log("add", a, b, c));
  const color = new PIXI.filters.ColorMatrixFilter();
  color.desaturate(true);
  return (
    <Stage
      width={700}
      height={500}
      options={{
        backgroundColor: 0x01262a
      }}
    >
      <AppConsumer>
        {app => {
          playPixi
            ? !app.isPlaying && app.start()
            : app.isPlaying && app.stop();
          // app.loader.onProgress.add(() => console.log('add'))
          console.log("LOADING", app.loader);
          return (
            <>
              <BackgroundImage image={sky} />
              <Container width={300} height={500}>
                {/* <TweenLiter to={node => {}}>
            <Sprite texture={PIXI.Texture.WHITE} tint={0xff00000} />
            <Sprite texture={PIXI.Texture.WHITE} x={15} tint={0x66d4c5} />
            <Sprite texture={PIXI.Texture.WHITE} x={30} tint={0x668bd4} />
          </TweenLiter> */}
                <Sprite
                  ref={r_sprite1}
                  texture={PIXI.Texture.WHITE}
                  tint={0xffffff}
                  x={10}
                  y={10}
                  width={50}
                  height={50}
                />
                <SpriteAnimated
                  filters={[color]}
                  width={100}
                  height={136}
                  app={app}
                  spritesheet={spritesheet}
                  isPlaying={false}
                />
                <Background spritesheet={spritesheet} motion={Linear.UP}>
                  <SpriteAnimated
                    // filters={[color]}
                    width={50}
                    height={68}
                    app={app}
                    isPlaying={false}
                  />
                </Background>
                {/* <SheetSprite
                ref={r_fighter}
                visible={showSprite}
                y={300}
                spritesheet={spritesheet}
                isPlaying={playSprite}
              /> */}
                <SheetSprite
                  ref={r_fighter2}
                  visible={showSprite}
                  x={150}
                  y={300}
                  spritesheet={spritesheet}
                  isPlaying={playSprite}
                />
              </Container>
            </>
          );
        }}
      </AppConsumer>
    </Stage>
  );
};

export default Splash;
