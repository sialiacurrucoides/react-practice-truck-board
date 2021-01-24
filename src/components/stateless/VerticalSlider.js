import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

function valuetext(value) {
  return `${value}`;
}


export default function VerticalSlider({position, changeVerticalPosition}) {
  const classes = useStyles();

  return (
    <div className="verticalSlider" >
      <div className={classes.root}>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={100}
          aria-labelledby="vertical-slider"
          onChangeCommitted={(ev, val) => {changeVerticalPosition(val)}}
        />
      </div>
    </div>
  );
}