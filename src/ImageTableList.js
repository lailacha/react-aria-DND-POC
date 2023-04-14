import {
  ActionButton,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Meter,
  SearchField,
  StatusLight,
  View
} from "@adobe/react-spectrum";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView
} from "@react-spectrum/table";
import Edit from "@spectrum-icons/workflow/Edit";
import { EditImageDialog } from "./EditImageDialog";
import Filter from "@spectrum-icons/workflow/Filter";
import ImageAutoMode from "@spectrum-icons/workflow/ImageAutoMode";
import TextEdit from "@spectrum-icons/workflow/TextEdit";
import { TextEditorModal } from "./TextEditorModal";
import { useAsyncList } from "react-stately";
import { useEffect, useMemo, useState } from "react";
import { useFilter } from "react-aria";

let columns = [
  { name: "Image Preview", key: "url", width: 150 },
  { name: "Filename", key: "filename" },
  { name: "Width", key: "width", width: 100 },
  { name: "Height", key: "height", width: 100 },
  { name: "Action", key: "action", width: 100 },
  { name: "Status", key: "status", width: 100 }
];

const ImageTableList = (props) => {
  let [tableItems] = useState(props.items);
  let { contains } = useFilter({ sensitivity: "base" });
  let [filterText, setFilterText] = useState("");
  let [tableDensity, setTableDensity] = useState("compact");
  let [imageTypeFilter, setImageTypeFilter] = useState(["jpg", "png"]);

  useEffect(() => {
    setTimeout(() => {
      setTableDensity("spacious");
    }, 1000);
  });

  let filterImage = (imageId) => {
    let item = props.items.find((anItem) => imageId === anItem.id);
    props.setSelectedImage(item);
  };

  let list = useAsyncList({
    async load() {
      return { items: tableItems };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.slice().sort((a, b) => {
          let cmp =
            a[sortDescriptor.column] < b[sortDescriptor.column] ? -1 : 1;
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        })
      };
    }
  });

  let statusCount = list.items.filter((item) => item.filters).length;

  let filteredItems = useMemo(
    () =>
      list.items.filter((item) => {
        if (
          imageTypeFilter.indexOf("jpg") !== -1 &&
          item.filename.endsWith(".jpg")
        ) {
          return contains(item.filename, filterText);
        } else if (
          imageTypeFilter.indexOf("png") !== -1 &&
          item.filename.endsWith(".png")
        ) {
          return contains(item.filename, filterText);
        }
      }),
    [list.items, filterText, imageTypeFilter, contains]
  );

  const onChange = (value) => {
    setFilterText(value);
  };

  return (
    <Grid
      areas={["header", "content"]}
      columns={["auto"]}
      rows={["size-1000", "auto"]}
    >
      <View gridArea="header">
        <Flex direction="row" gap="size-100" alignItems="center">
          <SearchField
            marginStart={"size-200"}
            marginBottom={"size-200"}
            marginTop={"size-200"}
            width={"size-3600"}
            aria-label={"Search by name"}
            placeholder={"Search by name"}
            value={filterText}
            onChange={onChange}
          />
          <ButtonGroup>
            <DialogTrigger type="popover">
              <ActionButton aria-label="table filter options">
                <Filter />
              </ActionButton>
              <Dialog>
                <Heading>Table filter options</Heading>
                <Divider />
                <Content>
                  <CheckboxGroup
                    label="Image types"
                    value={imageTypeFilter}
                    onChange={setImageTypeFilter}
                  >
                    <Checkbox value="jpg">jpg</Checkbox>
                    <Checkbox value="png">png</Checkbox>
                  </CheckboxGroup>
                </Content>
              </Dialog>
            </DialogTrigger>
          </ButtonGroup>
          <Meter
            label="Images Edited"
            maxValue={list.items.length}
            value={statusCount}
            variant="positive"
          />
        </Flex>
      </View>
      <View gridArea="content">
        <TableView
          aria-label="List of images to apply filters to"
          width="100%"
          height="100%"
          overflowMode="wrap"
          density={tableDensity}
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <Column
                width={column.width}
                allowsSorting={column.key === "filename"}
              >
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={filteredItems} loadingState="loading">
            {(item) => (
              <Row key={item.id}>
                {(key) => {
                  if (key === "url") {
                    return (
                      <Cell>
                        <Image src={item[key]} alt={item["alt"]} />
                      </Cell>
                    );
                  } else if (key === "action") {
                    return (
                      <Cell>
                        <ActionButton
                          isQuiet
                          onClick={() => filterImage(item["id"])}
                        >
                          <ImageAutoMode />
                        </ActionButton>
                        <DialogTrigger>
                          <ActionButton isQuiet>
                            <Edit />
                          </ActionButton>
                          {(close) => <EditImageDialog close={close} />}
                        </DialogTrigger>
                        <DialogTrigger type="fullscreenTakeover">
                          <ActionButton isQuiet>
                            <TextEdit />
                          </ActionButton>
                          {(close) => <TextEditorModal close={close} />}
                        </DialogTrigger>
                      </Cell>
                    );
                  } else if (key === "status") {
                    return (
                      <Cell>
                        {
                          <StatusLight
                            variant={item.filters ? "positive" : "negative"}
                          >
                            Edited
                          </StatusLight>
                        }
                      </Cell>
                    );
                  } else {
                    return <Cell>{item[key]}</Cell>;
                  }
                }}
              </Row>
            )}
          </TableBody>
        </TableView>
      </View>
    </Grid>
  );
};

export { ImageTableList };
