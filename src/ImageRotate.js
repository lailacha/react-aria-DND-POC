import {
  ActionButton,
  Flex,
  ToggleButton,
  Tooltip,
  TooltipTrigger
} from "@adobe/react-spectrum";
import FlipHorizontal from "@spectrum-icons/workflow/FlipHorizontal";
import FlipVertical from "@spectrum-icons/workflow/FlipVertical";
import RotateCCW from "@spectrum-icons/workflow/RotateCCW";
import RotateCW from "@spectrum-icons/workflow/RotateCW";

const ImageRotate = (props) => {
  let { filters, setFilters } = props;
  let { isFlipHorizontal, isFlipVertical, rotate } = filters;

  return (
    <Flex
      direction="row"
      rowGap="size-300"
      alignItems="center"
      marginTop="size-100"
      marginBottom="size-100"
    >
      <TooltipTrigger>
        <ActionButton
          aria-label="Rotate counter clockwise"
          isQuiet
          onPress={() => {
            setFilters({
              ...filters,
              rotate: rotate - 90
            });
          }}
        >
          <RotateCCW />
        </ActionButton>
        <Tooltip>Rotate counter clockwise</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ActionButton
          aria-label="Rotate clockwise"
          isQuiet
          onPress={(value) => {
            setFilters({
              ...filters,
              rotate: rotate + 90
            });
          }}
        >
          <RotateCW />
        </ActionButton>
        <Tooltip>Rotate clockwise</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ToggleButton
          aria-label="Flip horizontal"
          isQuiet
          isSelected={isFlipHorizontal}
          onChange={(value) => {
            setFilters({
              ...filters,
              isFlipHorizontal: value
            });
          }}
        >
          <FlipHorizontal />
        </ToggleButton>
        <Tooltip>Flip horizontal</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <ToggleButton
          aria-label="Flip vertical"
          isQuiet
          isSelected={isFlipVertical}
          onChange={(value) => {
            setFilters({
              ...filters,
              isFlipVertical: value
            });
          }}
        >
          <FlipVertical />
        </ToggleButton>
        <Tooltip>Flip vertical</Tooltip>
      </TooltipTrigger>
    </Flex>
  );
};

export { ImageRotate };
