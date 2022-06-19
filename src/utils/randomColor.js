import randomColor from "randomcolor";

export const getColors = (count) =>
  randomColor({
    count,
    luminosity: "bright",
    hue: 'random',
    format: "rgba",
    alpha: 0.5,
  });
