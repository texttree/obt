import React from 'react';

import useStyles, { useButtonStyles } from './style';
import { ButtonGroup, Button } from '@material-ui/core';

export default function ButtonGroupUI({ buttons }) {
  const classes = useStyles();
  const classesButton = useButtonStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup>
        {buttons.map((el, index) => (
          <Button key={index} className={classesButton.root} onClick={el.onClick}>
            {el.title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
