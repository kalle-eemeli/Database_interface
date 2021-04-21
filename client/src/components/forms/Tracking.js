import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import postData from './PostData';

import { SERVER_URL, ROUTES } from '../../config.json';

export default class TrackingTab extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            projects: null,
            users: null,

            
            startTime: "00:00:00",
            endTime: "00:00:00",
            userCurrent: '',
            projectCurrent: '',
            
            
            team: null,
            task: null,

        }
    }

    componentDidMount(){
        try{
            this.fetchUsers();
            this.fetchProjects()
        }catch(err){
            console.error(err);
        }
    }

    fetchUsers = async () => {

        const url = SERVER_URL.concat(ROUTES.USER);

        await fetch(url)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                users: result,
            }))
        }).catch(error => {
            this.setState({
                errmsg: error,
            })
        })
        //console.log(this.state.users);
    }

    fetchProjects = async () => {

        const url = SERVER_URL.concat(ROUTES.PROJECT);

        await fetch(url)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                projects: result,
            }))
        }).catch(error => {
            this.setState({
                errmsg: error,
            })
        })
        //console.log(this.state.users);
    } 

    handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        this.setState((prevState) => ({
            ...prevState,
            [name]: newValue
        }));
    };

    handleChange = evt => {

        //console.log(this.state.payload[userCurrent]);

        const newValue = evt.target.value;
        const name = evt.target.name;

        this.setState((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
        
    }

    handleSubmit = evt => {
        evt.preventDefault();

        var data = {
            userID: this.state.userCurrent,
            projectID: this.state.projectCurrent,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        };

        console.log(data);

        postData("TRACKING", data).then(data => alert(data));

        //console.log(data, fields.userid)
        //updateData("USER", data, fields.userid).then(props.onChange());

    };

    render() {

        const {users, projects, userCurrent, projectCurrent} = this.state;
        const handleInput = this.handleInput;

        return (
            <div className="horizontalContainer">
            <h3>Add a new tracking entry, team is set to 1 by default, tasks not yet implmented</h3>
                <form onSubmit={this.handleSubmit}>
    
                    {
                        users != null &&
                        <FormControl className="horizontalContainer" style={
                            {
                                minWidth: 350
                            }
                        }>
                            <InputLabel>Users</InputLabel>
                            <Select
                                name="userCurrent"
                                displayEmpty={true}
                                value={userCurrent}
                                onChange={this.handleChange}
                                variant="outlined"
                            >
                                {users.map(user => (
                                    <MenuItem value={user.userID}>
                                        {user.fullName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        

                    }
                    
                    {
                        projects != null &&
                        <FormControl className="horizontalContainer" style={
                            {
                                minWidth: 350
                            }
                        }>
                            <InputLabel>Projects</InputLabel>
                            <Select
                                name="projectCurrent"
                                displayEmpty={true}
                                value={projectCurrent}
                                onChange={this.handleChange}
                                variant="outlined"
                            >
                            {projects.map(project => (
                                <MenuItem value={project.projectID}>
                                    {project.projectName}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>

                    }
                    
                    <FormControl className="horizontalContainer" style={
                            {
                                display: "flex",
                                flexDirection: "row",
                                minWidth: 350,
                                margin: 20,
                            }
                        }>
                    <TextField
                        label={"startTime"}
                        name={"startTime"}
                        defaultValue={"YYYY-MM-DD hh:mm:ss"}
                        //className={classes.textField}
                        onChange={handleInput}
                        variant="outlined"
                    >
                    </TextField>
                    <TextField
                        label={"endTime"}
                        name={"endTime"}
                        defaultValue={"YYYY-MM-DD hh:mm:ss"}
                        //className={classes.textField}
                        onChange={handleInput}
                        variant="outlined"
                    ></TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        //className={classes.button}
                    >
                        Add
                    </Button>
                    </FormControl>
                </form>
            </div>
            
        )
    }

}