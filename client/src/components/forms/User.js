import {React, useState} from 'react';
import { TextField, Button, Paper, makeStyles, Select, MenuItem,} from '@material-ui/core';

export default function AddUserForm(props) {

    const useStyles = makeStyles(theme => ({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
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
            margin: theme.spacing(2)
        },
        select: {
            margin: theme.spacing(1),
            width: 200,
        }
    }))

    const [formInput, setFormInput] = useState(
        {
            name: "",
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

        console.log(data);

    };

    function getCities(){
        return (["City1", "City2", "City3"]);
    }

    const classes = useStyles();
    const cities = getCities();

    return (
        <div>
            <Paper className={classes.paper}>
                <form className={classes.container} onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        defaultValue={formInput.name}
                        className={classes.textField}
                        onChange={handleInput}
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        defaultValue={formInput.email}
                        className={classes.textField}
                        onChange={handleInput}
                        variant="outlined"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        defaultValue={formInput.address}
                        className={classes.textField}
                        onChange={handleInput}
                        variant="outlined"
                    />
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
                    </Select>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    )

}