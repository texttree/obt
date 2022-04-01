import React, { useEffect, useContext, useMemo } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../context';

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
  const {
    actions: { setTaRef },
    state: { taRef },
  } = useContext(AppContext);

  const path = useMemo(() => {
    if (taRef?.SupportReference) {
      const ref = taRef.SupportReference?.replace('rc://*/ta/man/translate/', '');
      return `${ref}/01.md`;
    }
    return null;
  }, [taRef]);

  const config = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: 'translate',
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'ta',
    filePath: path,
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };

  const {
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    ...config,
  });

  const {
    state: { item, headers, itemIndex, markdownView, filters },
    actions: { setItemIndex, setMarkdownView, setFilters },
  } = useCardState({
    items,
    verse,
    chapter,
    projectId: bookId,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      id={type}
      items={items}
      fontSize={fontSize}
      headers={headers}
      filters={filters}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      <CardContent
        item={item}
        viewMode={'markdown'}
        filters={filters}
        fontSize={fontSize}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdown={markdown}
        markdownView={markdownView}
        selectedQuote={taRef}
        setQuote={setTaRef}
      />
    </Card>
  );
}
