import React from "react";
import * as PIXI from "pixi.js";
import { TweenLite as TL } from "gsap";
import { Stage, Container, Sprite, AppConsumer } from "@inlet/react-pixi";

const TweenLiter = props => {
  const newkids = props.children.map((child, i) =>
    React.cloneElement(child, { key: i })
  );
  return newkids;
  // React.Children.forEach((c, i) => console.log('child', c, i))
  // console.log(React.Children.toArray(), props.children.length)
  // // return <Sprite texture={PIXI.Texture.WHITE} tint={0x00ff000} />;
  // return React.Children.map(child => {
  //   console.log('tweenliter', child)
  //   return React.cloneElement( child)
  // });
  // return props.children
};

export default TweenLiter;
