import React from "react";
import Axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core";


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

export default function AddCarForm() {
    const [plate, setPlate] = React.useState('');
    /** Maybe : ADD plate region for a better car plate detection ?**/
    const [model, setModel] = React.useState('');
    const [group, setGroup] = React.useState('');
    const [period, setPeriod] = React.useState(0)
    const labelRef = React.useRef(null);
    const classes = useStyles();

    function PlatehandleChange(event) {
        setPlate(event.target.value);
    }

    function ModelhandleChange(event) {
        setModel(event.target.value);
    }

    function GrouphandleChange(event) {
        setGroup(event.target.value);

    }

    function PeriodhandleChange(event) {
        setPeriod(event.target.value);

    }

    function handleSend() {

        Axios.post('http://localhost:5000/addcar', {
            plate: plate, group: group, model: model, period: period,
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
                <InputLabel htmlFor="component-helper">Car plate</InputLabel>
                <Input
                    id="component-helper"
                    value={plate}
                    onChange={PlatehandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Car
                    plate </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Model</InputLabel>
                <Input
                    id="component-helper"
                    value={model}
                    onChange={ModelhandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Car model and make
                    of car </FormHelperText>
                {/** outrange latitutde / longitude can be origin of bug BE CAREFUL **/}
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-helper">Period</InputLabel>
                <Input
                    id="component-helper"
                    value={period}
                    onChange={PeriodhandleChange}
                    aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Period during wich
                    the car is in the group authorization (0 if no
                    duration)</FormHelperText>
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
                <FormHelperText id="component-helper-text">Authorization level
                    group</FormHelperText>
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
