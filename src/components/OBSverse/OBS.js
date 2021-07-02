import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { server } from '../../config/base';

export default function OBSverse(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { referenceSelected, fontSize, resourcesApp },
  } = useContext(AppContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    projectId: referenceSelected.bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: resource.resourceId ?? 'obs',
    filePath: String(referenceSelected.chapter).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'bsa',
    server,
  });

  function mdToVerse(md) {
    if (md) {
      let _markdown = md.split('\n\n');
      _markdown.pop();
      _markdown.shift();
      const verseObject = [];
      for (let n = 0; n < _markdown.length / 2; n++) {
        const imageOBS = _markdown[n * 2];
        const text = _markdown[n * 2 + 1];
        let url_image = imageOBS.match(/\(([^)]*)\)/gm);
        url_image = url_image[0].slice(1, -1);

        verseObject.push({ url_image, text });
      }

      return verseObject;
    }
  }
  let verseOBS = [];
  if (markdown) {
    const verseMD = mdToVerse(markdown);

    verseOBS = verseMD.map((verse, key) => (
      <img
        key={key}
        onClick={(key) => {
          alert(key);
        }}
        src={verse.url_image}
        alt={key}
      />
    ));
  }

  const {
    state: { item, headers, itemIndex },
    actions: { setItemIndex },
  } = useCardState({
    items,
  });

  return (
    <>
      <Card
        closeable
        title={title}
        onClose={() => onClose(type)}
        classes={classes}
        items={items}
        fontSize={fontSize}
        headers={headers}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
      >
        {verseOBS}
      </Card>
    </>
  );
}
