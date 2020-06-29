import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Axios from "axios";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

export default function AddGateForm() {
    const [id, setId] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [lat, setLat] = React.useState('0.0000');
    const [long, setLong] = React.useState('0.0000');
    const [group, setGroup] = React.useState('');
    const labelRef = React.useRef(null);
    const classes = useStyles();

    function IdhandleChange(event) {
        setId(event.target.value);
    }

    function DeschandleChange(event) {
        setDesc(event.target.value);
    }

    function LathandleChange(event) {
        setLat(event.target.value);
    }

    function LonghandleChange(event) {
        setLong(event.target.value);
    }

    function GrouphandleChange(event) {
        setGroup(event.target.value);

    }

    function handleSend() {

        Axios.post('http://localhost:5000/addgate', {
            id: id, long: long, lat: lat, group: group, desc: desc,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Id gate</InputLabel>
                <Input
                    id="component-helper"
                    value={id}
                    onChange={IdhandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Id to identify a
                    gate (can be number or text)</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Latitude</InputLabel>
                <Input
                    id="component-helper"
                    value={lat}
                    onChange={LathandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Latitude of the
                    gate </FormHelperText>
                {/** outrange latitutde / longitude can be origin of bug BE CAREFUL **/}
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Longitude</InputLabel>
                <Input
                    id="component-helper"
                    value={long}
                    onChange={LonghandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Longitude of the
                    gate</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Description</InputLabel>
                <Input
                    id="component-helper"
                    value={desc}
                    onChange={DeschandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Description of the
                    gate</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Authorization
                    group</InputLabel>
                <Input
                    id="component-helper"
                    value={group}
                    onChange={GrouphandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Group of car that
                    are allowed to cross the gate</FormHelperText>
            </FormControl>
            <Button variant="contained" onClick={handleSend} color="primary"
                    className={classes.button}>
                Send
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}></Icon>
            </Button>
        </div>
    );
}
