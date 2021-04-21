import { React, useState } from 'react';
import { TextField, Button, Paper, makeStyles, capitalize,} from '@material-ui/core';
import postData from './PostData';
import MaterialTable from '../MaterialTable';

export default function UserForm(props) {

    const useStyles = makeStyles(theme => ({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 50,
        },
        textField: {
            margin: theme.spacing(1),
            width: 200,
        },
        button: {
            margin: theme.spacing(1),
            width: 100,
        },
        paper: {
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center"
        },
        select: {
            margin: theme.spacing(1),
            width: 200,
        }
    }))

    const [formInput, setFormInput] = useState(
        {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            phonenumber: "",
            email: "",
            address: "",
        }
    );

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput((prevState) => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        var data = formInput;

        postData("USER", data).then(data => alert(data));

    };

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <form className={classes.container} onSubmit={handleSubmit}>
                <h3>ADD NEW USER</h3>
                    {Object.keys(formInput).map(input => (
                        <TextField 
                            label={capitalize(input)}
                            name={input}
                            defaultValue={formInput[input]}
                            className={classes.textField}
                            onChange={handleInput}
                            variant="outlined"
                        />
                    ))}
                    {/*
                    <Select
                        name="city"
                        label="City"
                        onChange={handleInput}
                        value={formInput.city}
                        className={classes.select}
                    >
                        {cities.map(city => (
                            <MenuItem value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select> */}
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
                <MaterialTable table="User" update_form={true}/>
            </Paper>
        </div>
    )

}