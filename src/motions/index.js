import * as PIXI from "pixi.js";
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";

export const Random = {
  update: (items, bounds) => {
    return items.map(item => {
      let newItem = {
        x: item.x + Math.sin(item.direction) * (item.speed * item._s),
        y: item.y + Math.cos(item.direction) * (item.speed * item._s),
        rotation: -item.direction + Math.PI,
        direction: item.direction + item.turningSpeed * 0.01
      };

      wrapBounds(item, bounds);

      return { ...item, ...newItem };
    });
  },

  setup: (numItems, bounds, props) => {
    return [...Array(numItems)].map(() => ({
      speed: (2 + Math.random() * 2) * 0.2,
      offset: Math.random() * 100,
      turningSpeed: Math.random() - 0.8,
      direction: Math.random() * Math.PI * 2,
      tint: Math.random() * 0x808080,
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
      _s: 0.8 + Math.random() * 0.3,
      rotation: 15
    }));
  }
};

export const Linear = {
  UP: {
    update: (items, bounds) => linearUpdate(items, bounds, UP),
    setup: (numItems, bounds, props) => linearSetup(numItems, bounds, props, UP)
  },
  DOWN: {
    update: (items, bounds) => linearUpdate(items, bounds, DOWN),
    setup: (numItems, bounds, props) =>
      linearSetup(numItems, bounds, props, DOWN)
  },
  LEFT: {
    update: (items, bounds) => linearUpdate(items, bounds, LEFT),
    setup: (numItems, bounds, props) =>
      linearSetup(numItems, bounds, props, LEFT)
  },
  RIGHT: {
    update: (items, bounds) => linearUpdate(items, bounds, RIGHT),
    setup: (numItems, bounds, props) =>
      linearSetup(numItems, bounds, props, RIGHT)
  }
};
const linearUpdate = (items, bounds, dir) => {
  return items.map(item => {
    const pos = item.speed * item._s;
    let newItem = {
      ...(dir === UP && { y: item.y - pos }),
      ...(dir === DOWN && { y: item.y + pos }),
      ...(dir === LEFT && { x: item.x - pos }),
      ...(dir === RIGHT && { x: item.x + pos })
    };
    wrapBounds(item, bounds);
    return { ...item, ...newItem };
  });
};
const linearSetup = (numItems, bounds, props, dir) => {
  // color.brightness(0.5)
  const { width, height } = props;
  const scaleMax = 1;
  const scaleMin = 0.25;
  // console.log('PROPS', props, scaleMax, scaleMin, scale)
  return [...Array(numItems)].map(() => {
    const color = new PIXI.filters.ColorMatrixFilter();
    const scale = Math.random() * (scaleMax - scaleMin) + scaleMin;
    // console.log("scale", scale);
    color.contrast(1 - scale);
    return {
      filters: [color],
      speed: (2 + Math.random() * 2) * 0.2,
      offset: Math.random() * 100,
      // tint: Math.random() * 0x808080,
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
      _s: 0.8 + Math.random() * 0.3,
      // scale
      width: width * scale,
      height: height * scale
    };
  });
};

const wrapBounds = (item, bounds) => {
  if (item.x < bounds.x) {
    item.x += bounds.width;
  } else if (item.x > bounds.x + bounds.width) {
    item.x -= bounds.width;
  }

  if (item.y < bounds.y) {
    item.y += bounds.height;
  } else if (item.y > bounds.y + bounds.height) {
    item.y -= bounds.height;
  }
};
