import React, { useState, useEffect, useContext } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import { FrontModal, ButtonGroupUI } from '../../components';
import { MarkdownViewer } from '../MarkdownViewer';

export default function SupportTN({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const [configFront, setConfigFront] = useState({});
  const { t } = useTranslation();

  const {
    actions: { setTaRef },
  } = useContext(AppContext);

  const config = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };

  const {
    items,
    resourceStatus: { loading },
  } = useContent({
    ...config,
  });

  const onIntroClick = () => {
    setConfigFront({ ...config, verse: 'intro', chapter: 'front' });
    setOpenDialog(true);
  };
  const onNotesClick = () => {
    setConfigFront({ ...config, verse: 'intro' });
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  useEffect(() => {
    if (item && setTaRef) {
      const { OrigQuote, SupportReference, Occurrence, ID } = item;
      const quote = {
        OrigQuote,
        SupportReference,
        Occurrence,
        ID,
      };

      setTaRef(
        Object.keys(quote).reduce(
          (prev, current) =>
            !!quote[current] ? { ...prev, [current]: quote[current] } : { ...prev },
          {}
        )
      );
    }
  }, [item, setTaRef]);

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse]);

  const links = items && items[itemIndex]?.OccurrenceNote.match(/\[{2}.+\]{2}/g);
  console.log({ item });
  const content =
    items &&
    items[itemIndex]?.OccurrenceNote.replace(
      '[[',
      `[${links && links[0].replace(/\[{2}|\]{2}/g, '')}](`
    ).replace(']]', ')');
  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(true)}
      classes={classes}
      id={type}
      items={items}
      fontSize={fontSize}
      headers={headers}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      {items && (
        <ButtonGroupUI
          buttonGroupProps={{ size: 'small', color: 'inherit' }}
          style={{ marginTop: '10px' }}
          buttons={[
            { title: t('Introduction'), onClick: onIntroClick },
            { title: t('General_notes'), onClick: onNotesClick },
          ]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          title={' '}
          config={configFront}
        />
      )}

      {items && items.length > 0 && (
        <>
          <MarkdownViewer config={{}}>{`# ${items[itemIndex]?.GLQuote}`}</MarkdownViewer>

          <MarkdownViewer
            config={{
              server: server,
              owner: resource.owner ?? 'door43-catalog',
              ref: resource.branch ?? 'master',
              languageId: resource.languageId ?? 'ru',
            }}
          >
            {content}
          </MarkdownViewer>
        </>
      )}
    </Card>
  );
}
