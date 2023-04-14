import CropRotate from "@spectrum-icons/workflow/CropRotate";
import { View } from "@adobe/react-spectrum";
import Info from "@spectrum-icons/workflow/Info";
import { ImageDetail } from "./ImageDetail";
import { ImageEdit } from "./ImageEdit";
import { ImageRotate } from "./ImageRotate";
import { Item, TabList, TabPanels, Tabs } from "@react-spectrum/tabs";
import Properties from "@spectrum-icons/workflow/Properties";

const ImageControls = (props) => {
  return (
    <Tabs aria-label="Image controls" height="100%">
      <TabList marginStart="size-100" marginEnd="size-100">
        <Item key="edit">
          <Properties aria-label="Image edit" />
        </Item>
        <Item key="rotate">
          <CropRotate aria-label="Image rotate" />
        </Item>
        <Item key="details">
          <Info aria-label="Image details" />
        </Item>
      </TabList>
      <TabPanels minHeight="0px">
        <Item key="edit">
          <View maxHeight="100%" overflow="auto">
            <ImageEdit {...props} />
          </View>
        </Item>
        <Item key="rotate">
          <ImageRotate {...props} />
        </Item>
        <Item key="details">
          <ImageDetail />
        </Item>
      </TabPanels>
    </Tabs>
  );
};

export { ImageControls };
