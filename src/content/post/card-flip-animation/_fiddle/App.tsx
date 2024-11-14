import { motion } from "framer-motion";
import * as React from "react";
import "./app.css";

export default function App() {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="wrapper">
      <div className="card" onClick={() => setFlipped((v) => !v)}>
        <motion.div
          className="card-inner"
          initial={false}
          animate={{
            scale: [null, 0.95, 0.95, 1],
            rotateY: [
              null,
              flipped ? 0 : 180,
              flipped ? 180 : 0,
              flipped ? 180 : 0,
            ],
            perspective: ["0px", "-1000px", "-1000px", "0px"],
            transition: { duration: 0.3, times: [0, 0.3, 0.6, 1] },
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.1, ease: "linear" },
          }}
        >
          <div className="card-face" />
          <div className="card-back">Back of card</div>
        </motion.div>
      </div>
    </div>
  );
}
