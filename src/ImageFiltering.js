import {
  ActionButton,
  Breadcrumbs,
  Flex,
  Item,
  View
} from "@adobe/react-spectrum";
import Close from "@spectrum-icons/workflow/Close";
import { ImageControls } from "./ImageControls";
import { ImageView } from "./ImageView";
import { useState } from "react";
import { useMediaQuery } from "@react-spectrum/utils";

export function ImageFiltering(props) {
  let [filters, setFilters] = useState(props.selectedImage.filters);

  let isMobile = useMediaQuery("(max-width: 700px)");
  let layoutDirection = isMobile ? "column" : "row";
  let controlWidth = isMobile ? "100%" : "300px";

  let updateFilters = (imageFilters) => {
    props.selectedImage.filters = imageFilters;
    props.setSelectedImage(props.selectedImage);
    setFilters(imageFilters);
  };

  return (
    <>
      <View
        backgroundColor="gray-200"
        height="48px"
        borderBottomColor="gray-50"
        borderBottomWidth="2px"
      >
        <Flex height="100%">
          <Breadcrumbs alignSelf="center" isDisabled flexGrow="1">
            <Item key="images">Images</Item>
            <Item key="filename">{props.selectedImage.filename}</Item>
          </Breadcrumbs>
          <ActionButton
            isQuiet
            onClick={props.onClose}
            alignSelf="center"
            right="0px"
            position="absolute"
          >
            <Close />
          </ActionButton>
        </Flex>
      </View>
      <Flex direction={layoutDirection} height="100%">
        <View
          backgroundColor="gray-50"
          flex="1 1 0"
          padding="size-200"
          minHeight="0px"
          minWidth="0px"
        >
          <ImageView filters={filters} image={props.selectedImage} />
        </View>
        <View
          backgroundColor="gray-100"
          flex={isMobile ? "1 1 0" : "0 0 auto"}
          minHeight="0px"
          minWidth="0px"
          width={controlWidth}
        >
          <ImageControls filters={filters} setFilters={updateFilters} />
        </View>
      </Flex>
    </>
  );
}
