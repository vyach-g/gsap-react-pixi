import * as GSAP from "gsap";

export const whiteBox = node => {
  console.log("whitebox", node);
  return GSAP.TweenLite.to(node, 1, {
    pixi: {
      width: 280,
      height: 480
    },
    ease: GSAP.Bounce.easeOut
    // onUpdate: () => console.log("updating")
  });
};
