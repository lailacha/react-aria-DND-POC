import { View } from "@adobe/react-spectrum";
import { ImageFiltering } from "./ImageFiltering";
import { ImageTableList } from "./ImageTableList";
import { useState, useRef} from "react";
import {Well} from '@adobe/react-spectrum'
import {useDrag, useDrop} from 'react-aria';

import "./styles.css";


export default function App() {
  let { dragProps, isDragging } = useDrag({
    getItems() {
      return [{
        'img': 'https://via.placeholder.com/350x150'
      }];
    },
    onDragStart() {
      console.log('drag started');
    }
  });
  let [dropped, setDropped] = useState(null);
  let ref = useRef(null);
  let { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      console.log('dropped', e.items);
      let items = await Promise.all(
        e.items
          .filter((item) =>
            item.kind === 'text' &&
            (item.types.has('img') ||
              item.types.has('my-app-custom-type'))
          )
          .map(async (item: TextDropItem) => {
            if (item.types.has('my-app-custom-type')) {
              return JSON.parse(await item.getText('my-app-custom-type'));
            } else {
              return { message: await item.getText('img') };
            }
          })
      );
      setDropped(items);
    }
  });

  let message = "drop";
  if (dropped) {
    console.log(dropped)
    message = dropped.map((d) => {
      let message = d.message;
      if (d.style === 'bold') {
        message = <strong>{message}</strong>;
      } else if (d.style === 'italic') {
        message = <em>{message}</em>;
      }
      return message;
    });
  }

  console.log("msg",message)

  return (
    <View height="100%">
     <div  {...dragProps} className={`draggable ${isDragging ? 'dragging' : ''}`}
>
      
      <Well>
      Drag
</Well>

     </div>

     <div  {...dropProps} ref={ref}>
      <Well>
        <img src={`${message ?? 'bla'}`} />
     {message}

</Well>

     </div>
    </View>
  );
}
