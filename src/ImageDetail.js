import { Form, TextField } from "@adobe/react-spectrum";

const ImageDetail = (props) => {
  var img = document.getElementById("rspLRimg").children[0];
  var filename = img.src.substring(img.src.lastIndexOf("/") + 1);

  return (
    <Form isReadOnly isQuiet labelPosition="side" width="75%">
      <TextField label="Filename" value={filename} />
      <TextField label="Width" value={img.naturalWidth} />
      <TextField label="Height" value={img.naturalHeight} />
    </Form>
  );
};

export { ImageDetail };
