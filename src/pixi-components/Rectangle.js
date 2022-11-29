import { Graphics } from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";

const Rectangle = PixiComponent("Rectangle", {
  create: props => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;

    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  }
});

export default Rectangle;
