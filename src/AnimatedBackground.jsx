import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AnimatedBackground({ weather }) {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  if (!weather) return null;

  let options = {};

  const desc = weather.description.toLowerCase();

  if (desc.includes("rain")) {
    options = {
      particles: {
        number: { value: 120 },
        move: { direction: "bottom", speed: 6 },
        shape: { type: "line" },
        size: { value: 10 },
        color: { value: "#ffffff" }
      }
    };
  }

  else if (desc.includes("snow")) {
    options = {
      particles: {
        number: { value: 80 },
        move: { speed: 2 },
        size: { value: 4 },
        color: { value: "#ffffff" }
      }
    };
  }

  else if (desc.includes("cloud")) {
    options = {
      particles: {
        number: { value: 40 },
        size: { value: 8 },
        opacity: { value: 0.4 }
      }
    };
  }

  else {
    options = {
      particles: {
        number: { value: 25 },
        size: { value: 6 },
        color: { value: "#ffffff" }
      }
    };
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
}