import { Button, TextField, capitalize } from '@material-ui/core';
import { React, useState, useEffect } from 'react';

import { updateData, deleteData } from './PostData';

export default function UpdateForm(props) {

    var Obj = props.object;
    //console.log(Obj);

    const [fields, setFields] = useState({

        username: Obj.username,
        password: Obj.password,
        firstname: Obj.firstname,
        lastname: Obj.lastname,
        phonenumber: Obj.phonenumber,
        email: Obj.email,
        userid: Obj.userID

    })

    useEffect(() => {
        console.log(props.object)
    }, [props.object]);

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFields((prevState) => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        var data = fields;

        //console.log(data, fields.userid)
        updateData("USER", data, fields.userid).then(props.onChange());

    };

    const DeleteUser = id => {
        
        deleteData("USER", id).then(props.onChange);

    }

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(fields).map(input => (
                <TextField 
                    label={capitalize(input)}
                    name={input}
                    defaultValue={fields[input]}
                    //className={classes.textField}
                    onChange={handleInput}
                    variant="outlined"
                />
            ))}
            <Button
                type="submit"
                variant="contained"
                //className={classes.button}
            >
                Update
            </Button>
            <Button
                onClick={() => DeleteUser(fields.userid)}
                variant="contained"
            >
                Delete
            </Button>
        </form>
    )

}