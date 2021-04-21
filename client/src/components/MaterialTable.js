import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Button, Checkbox, IconButton } from '@material-ui/core';
import UpdateForm from './forms/UpdateForm';

import { SERVER_URL, ROUTES } from '../config.json';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// const useStyles = makeStyles({
//     table: {
//         minWidth: 700,
//     },
// });

const url = SERVER_URL.concat(ROUTES.UTILS);

export default class MaterialTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            table_name: this.props.table,
            items: [],
            fieldnames: [],
            errmsg: '',
            checked: null,
            selected: null,
            update_form: props.update_form,
        }
    }
    
    fetchItems = async (table) => {
        await fetch(`${SERVER_URL}/utils/selectall/${table}/`)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                items: result,
            }))
        }).catch(error => {
            this.setState({
                errmsg: error,
            })
        })
    }

    fetchFieldnames = async (table_name) => {
        await fetch(`${SERVER_URL}/utils/${table_name}/`)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                fieldnames: result,
              }))
        }).catch(error => {
            this.setState({
                errmsg: error,
            })
        })
    }

    updateFields(){
        this.fetchItems(this.state.table_name);
    }

    componentDidMount(){
        try{
            this.fetchItems(this.state.table_name);
            this.fetchFieldnames(this.state.table_name);
        }catch(err){
            console.error(err);
        }
    }

    itemChecked = (evt,item) => {

        const checked = evt.target.checked;
        console.log(checked);

        if (!checked) {
            this.setState({
                selected: item,
            });
    
            console.log(this.state.selected);
        }

    }

    sorter(checkedItem, item){
        
        this.setState({
            checked: checkedItem,
            selected: {
                username: item.userName,
                password: item.password,
                firstname: item.firstName,
                lastname: item.lastName,
                phonenumber: item.phoneNumber,
                email: item.email,
                userID: item.userID
            },
        })

    }

    render(){

        const {fieldnames} = this.state;
        const {items} = this.state;

        if (true) {
            return (
                <div>
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>
                                        <Checkbox></Checkbox>
                                    </StyledTableCell>
                                {fieldnames.map(field => (
                                    <StyledTableCell>
                                        {field.COLUMN_NAME}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell>
                                        <Checkbox 
                                            checked={this.state.checked === i}
                                            onClick={() => this.sorter(i, item)}
                                            // onChange={(event) => this.itemChecked(event, item)}
                                        >
                                        </Checkbox>
                                    </StyledTableCell>
                                    {fieldnames.map(field => (
                                        <StyledTableCell>
                                            {item[field.COLUMN_NAME]}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {this.state.update_form === true &&
                        <div>
                        {this.state.selected != null &&
                            <div>
                                <IconButton onClick={() => this.setState({selected: null})}>Close</IconButton>
                                <UpdateForm object={this.state.selected} onChange={() => this.updateFields()}></UpdateForm>
                            </div>
                        }
                        </div>
                    }
                        
                </div>
            )
        } else {
            return (
                <div>
                    
                </div>
            )
        }
        
    }
      
}