import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function HorizontalSlider({hPosition, changeHorizontalPosition}) {
  const classes = useStyles();
  return (
    <div className="horizontalSlider" >
      <div className={classes.root}>
        <Slider
          value={hPosition}
          orientation="horizontal"
          getAriaValueText={valuetext}
          defaultValue={0}
          aria-labelledby="horizontal-slider"
          onChangeCommitted={(ev, val) => {changeHorizontalPosition(val)}}
        />
      </div>
    </div>
  );
}
