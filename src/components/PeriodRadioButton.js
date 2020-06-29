import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('day');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
    <ListSubheader inset>Period</ListSubheader>
        <RadioGroup
          aria-label="Period"
          name="period_overall"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="day" onChange={props.handleCallback(value)} control={<Radio />} label="Day" />
          <FormControlLabel value="week" onChange={props.handleCallback(value)}control={<Radio />} label="Week" />
          <FormControlLabel value="month" onChange={props.handleCallback(value)}control={<Radio />} label="Month" />
          <FormControlLabel value="year" onChange={props.handleCallback(value)} control={<Radio />} label="Year" />
            {/*<FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
          */}
        </RadioGroup>
      </FormControl>

    </div>
  );
}