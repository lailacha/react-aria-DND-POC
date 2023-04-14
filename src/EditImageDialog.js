import {
  AlertDialog,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Form,
  Heading,
  Item,
  NumberField,
  Picker,
  ProgressBar,
  Radio,
  RadioGroup,
  Switch,
  Text,
  TextArea,
  TextField
} from "@adobe/react-spectrum";
import { useEffect, useState } from "react";

export function EditImageDialog(props) {
  let [form, setForm] = useState({});
  let [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer < 100) {
      setTimeout(() => setTimer(timer + 1), 1000);
    }
  });

  return (
    <Dialog>
      <Heading>Edit and resize image</Heading>
      <Divider />
      <Content>
        <Text>Kitchen sink</Text>
        <Form width="100%">
          <ProgressBar
            label="Please complete before the time runs out"
            value={timer}
          />
          <TextField
            label="Filename"
            autofocus
            onChange={(value) => {
              setForm({
                ...form,
                filename: value
              });
            }}
          />
          <TextArea
            label="Alt tag"
            onChange={(value) => {
              setForm({
                ...form,
                alt: value
              });
            }}
          />
          <CheckboxGroup
            label="Adjust"
            onChange={(value) => {
              setForm({
                ...form,
                adjust: value
              });
            }}
          >
            <Checkbox value="scale">Scale proportionally</Checkbox>
            <Checkbox value="resample">Resample Image</Checkbox>
          </CheckboxGroup>
          <NumberField
            label="Width"
            minValue={0}
            onChange={(value) => {
              setForm({
                ...form,
                width: value
              });
            }}
          />
          <NumberField
            label="Height"
            minValue={0}
            onChange={(value) => {
              setForm({
                ...form,
                height: value
              });
            }}
          />
          <NumberField
            label="Resolution"
            minValue={0}
            onChange={(value) => {
              setForm({
                ...form,
                resolution: value
              });
            }}
          />
          <Picker
            label="Units"
            onSelectionChange={(value) => {
              setForm({
                ...form,
                units: value
              });
            }}
          >
            <Item key="pxs">pixels</Item>
            <Item key="pct">percent</Item>
            <Item key="in">inches</Item>
            <Item key="cm">cm</Item>
            <Item key="pts">points</Item>
          </Picker>
          <RadioGroup
            label="Transform"
            onChange={(value) => {
              setForm({
                ...form,
                transform: value
              });
            }}
          >
            <Radio value="left">Rotate left</Radio>
            <Radio value="right">Rotate right</Radio>
            <Radio value="horizontal">Flip horizontal</Radio>
            <Radio value="vertical">Flip vertical</Radio>
          </RadioGroup>
          <Switch
            onChange={(value) => {
              setForm({
                ...form,
                actual: value
              });
            }}
          >
            Actual Size
          </Switch>
          <ButtonGroup>
            <Button variant="secondary" onPress={props.close}>
              Cancel
            </Button>
            <DialogTrigger>
              <Button variant="primary">Confirm</Button>
              <AlertDialog
                title="Image data"
                variant="information"
                primaryActionLabel="Close"
              >
                <Content>
                  <Flex direction="column" gap="size-100">
                    <ProgressBar label="Review data" isIndeterminate />
                    <Text>Filename: {form.filename}</Text>
                    <Text>Alt tag: {form.alt}</Text>
                    <Text>Adjust: {form.adjust && form.adjust.join(", ")}</Text>
                    <Text>Width: {form.width}</Text>
                    <Text>Height: {form.height}</Text>
                    <Text>Resolution: {form.resolution}</Text>
                    <Text>Units: {form.units}</Text>
                    <Text>Transform: {form.transform}</Text>
                    <Text>Actual: {form.actual}</Text>
                  </Flex>
                </Content>
              </AlertDialog>
            </DialogTrigger>
          </ButtonGroup>
        </Form>
      </Content>
    </Dialog>
  );
}
