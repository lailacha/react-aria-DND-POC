import { Flex, Slider, ToggleButton } from "@adobe/react-spectrum";
import { ColorSlider } from "@react-spectrum/color";
import React from "react";

const ImageEdit = (props) => {
  let { filters, setFilters } = props;
  let {
    brightness,
    color,
    contrast,
    hueRotate,
    invert,
    isBandW,
    opacity,
    saturate,
    sepia
  } = filters;

  let setColor = (value) => {
    setFilters({
      ...filters,
      color: value
    });
  };

  return (
    <Flex
      direction="column"
      rowGap="size-300"
      alignItems="center"
      marginTop="size-100"
      marginBottom="size-100"
    >
      <ToggleButton
        isSelected={isBandW}
        onChange={(value) => {
          setFilters({
            ...filters,
            isBandW: value
          });
        }}
      >
        B&W
      </ToggleButton>
      <Slider
        label="Brightness"
        minValue={-5}
        maxValue={5}
        value={brightness}
        formatOptions={{ signDisplay: "always" }}
        step={0.01}
        fillOffset={0}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            brightness: value
          });
        }}
      />
      <Slider
        label="Contrast"
        minValue={-5}
        maxValue={5}
        value={contrast}
        formatOptions={{ signDisplay: "always" }}
        step={0.01}
        fillOffset={0}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            contrast: value
          });
        }}
      />
      <ErrorBoundary>
        <Slider
          label="Hue Rotate"
          minValue={0}
          maxValue={360}
          value={hueRotate}
          formatOptions={{ style: "unit", unit: "degree" }}
          isFilled
          onChange={(value) => {
            setFilters({
              ...filters,
              hueRotate: value
            });
          }}
        />
      </ErrorBoundary>
      <Slider
        label="Invert"
        maxValue={1}
        value={invert}
        formatOptions={{ style: "percent" }}
        step={0.01}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            invert: value
          });
        }}
      />
      <Slider
        label="Opacity"
        maxValue={1}
        value={opacity}
        formatOptions={{ style: "percent" }}
        step={0.01}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            opacity: value
          });
        }}
      />
      <Slider
        label="Saturate"
        minValue={-5}
        maxValue={5}
        value={saturate}
        formatOptions={{ signDisplay: "always" }}
        step={0.01}
        fillOffset={0}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            saturate: value
          });
        }}
      />
      <Slider
        label="Sepia"
        maxValue={1}
        value={sepia}
        formatOptions={{ style: "percent" }}
        step={0.01}
        isFilled
        onChange={(value) => {
          setFilters({
            ...filters,
            sepia: value
          });
        }}
      />
      <ColorSlider channel="red" value={color} onChange={setColor} />
      <ColorSlider channel="green" value={color} onChange={setColor} />
      <ColorSlider channel="blue" value={color} onChange={setColor} />
      <ColorSlider channel="alpha" value={color} onChange={setColor} />
    </Flex>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Your browser may not support this image control.</div>;
    }

    return this.props.children;
  }
}

export { ImageEdit };
