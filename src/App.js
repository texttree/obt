import React, { useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { Workspace } from 'resource-workspace-rcl';
import { MenuBar, SubMenuBar, TypoReport, Card } from './components';

import { getResources } from './helper';

import { makeStyles } from '@material-ui/core/styles';
import './styles/app.css';

const config = { server: 'https://git.door43.org' };

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : [
      { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
      { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
      { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
    ];

const _resourceLinks = getResources(_appConfig);

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

export default function App() {
  const classes = useStyles();
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [appConfig, setAppConfig] = useState(_appConfig);

  useEffect(() => {
    setResourceLinks(getResources(appConfig));
  }, [appConfig]);

  const [referenceSelected, setReferenceSelected] = useState({
    bookId: 'rut',
    chapter: 1,
  });
  const [showBookSelect, setShowBookSelect] = useState(true);
  const layout = {
    absolute: appConfig,
  };

  function onLayoutChange(appConfig) {
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
    setAppConfig(appConfig);
  }

  const onClose = (index) => {
    setAppConfig((prev) => prev.filter((el) => el.i !== index));
  };

  useEffect(() => {
    if (referenceSelected?.verse) {
      /* console.log(
        'Reference: ' + referenceSelected?.chapter + ':' + referenceSelected?.verse
      ); */
    }
  }, [referenceSelected?.chapter, referenceSelected?.verse]);

  return (
    <ResourcesContextProvider
      reference={referenceSelected}
      resourceLinks={resourceLinks}
      defaultResourceLinks={_resourceLinks}
      onResourceLinks={setResourceLinks}
      resources={resources}
      onResources={setResources}
      config={config}
    >
      <ReferenceSelectedContextProvider
        referenceSelected={referenceSelected}
        onReferenceSelected={setReferenceSelected}
      >
        <MenuBar />
        <SubMenuBar
          appConfig={appConfig}
          setAppConfig={setAppConfig}
          referenceSelected={referenceSelected}
          setReferenceSelected={setReferenceSelected}
          showBookSelect={showBookSelect}
          setShowBookSelect={setShowBookSelect}
        />
        <Workspace
          gridMargin={[15, 15]}
          rowHeight={30}
          totalGridUnits={12}
          classes={classes}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          {appConfig.map((item) => (
            <Card
              classes={classes}
              key={item.i}
              onClose={() => onClose(item.i)}
              reference={referenceSelected}
              type={item.i}
            />
          ))}
        </Workspace>
      </ReferenceSelectedContextProvider>
      <TypoReport />
    </ResourcesContextProvider>
  );
}
