import { useState } from "react";
import { OutletProps } from "react-router";
import { useOutlet } from "remix";

function AnimatedOutlet<T extends OutletProps>({ context }: T) {
  const [outlet] = useState(useOutlet(context));
  return outlet;
}

export default AnimatedOutlet;
