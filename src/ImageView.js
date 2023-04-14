import { Flex, Image } from "@adobe/react-spectrum";
import { useEffect, useState } from "react";

import "./ImageView.css";

const ImageView = (props) => {
  let {
    brightness,
    color,
    contrast,
    isFlipHorizontal,
    isFlipVertical,
    hueRotate,
    invert,
    isBandW,
    opacity,
    rotate,
    saturate,
    sepia
  } = props.filters;

  let [scale, setScale] = useState(1);
  useEffect(() => {
    var img = document.getElementById("rspLRimg").children[0];
    if (rotate % 180 !== 0) {
      setScale(
        img.naturalWidth > img.naturalHeight
          ? img.naturalHeight / img.naturalWidth
          : 1
      );
    } else {
      setScale(1);
    }
  }, [rotate]);

  let filterBrightness = ((brightness - -5) / (5 - -5)) * (200 - 0) + 0;
  let rgbaColor =
    "rgba(" +
    color.red +
    "," +
    color.green +
    "," +
    color.blue +
    "," +
    color.alpha +
    ")";
  let filterContrast = ((contrast - -5) / (5 - -5)) * (200 - 0) + 0;
  let filterFlipHorizontal = isFlipHorizontal ? -1 : 1;
  let filterFlipVertical = isFlipVertical ? -1 : 1;
  let filterGrayscale = isBandW ? 100 : 0;
  let filterInvert = invert * 100;
  let filterOpacity = opacity * 100;
  let filterSaturate = ((saturate - -5) / (5 - -5)) * (200 - 0) + 0;
  let filterSepia = sepia * 100;

  let filter = {
    backgroundColor: rgbaColor,
    filter:
      "brightness(" +
      filterBrightness +
      "%) contrast(" +
      filterContrast +
      "%) grayscale(" +
      filterGrayscale +
      "%) hue-rotate(" +
      hueRotate +
      "deg) invert(" +
      filterInvert +
      "%) opacity(" +
      filterOpacity +
      "%) saturate(" +
      filterSaturate +
      "%) sepia(" +
      filterSepia +
      "%)",
    transform:
      "rotate(" +
      rotate +
      "deg) scaleX(" +
      filterFlipHorizontal +
      ") scaleY(" +
      filterFlipVertical +
      ") scale(" +
      scale +
      ")"
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Image
        id="rspLRimg"
        src={props.image.url}
        alt="White and orange California poppy plants"
        height="100%"
        width="100%"
        UNSAFE_style={filter}
      />
    </Flex>
  );
};

export { ImageView };
