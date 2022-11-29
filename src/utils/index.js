export * from "./Imgur";
import React, { useCallback } from "react";
import { TweenLite } from "gsap";

export const useTweenLite = tween => {
  return useCallback(node => tween(TweenLite, node), [tween]);
};
// export const useTweenMax = (tween) => {
//   return useCallback(node => tween(TweenMax, node), [tween]);
// }
// export const useTimeLineLite = (tween) => {
//   return useCallback(node => tween(TimelineLite, node), [tween]);
// }
// export const useTimeLineMax = (tween) => {
//   return useCallback(node => tween(TimelineMax, node), [tween]);
// }
