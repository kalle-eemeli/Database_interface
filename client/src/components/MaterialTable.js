import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Button, Checkbox } from '@material-ui/core';

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

export default class MaterialTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            table_name: this.props.table,
            items: [],
            fieldnames: [],
            errmsg: ''
        }
    }
    
    fetchItems = async (table) => {
        await fetch(`http://localhost:9000/utils/selectall/${table}/`)
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
        await fetch(`http://localhost:9000/utils/${table_name}/`)
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

    componentDidMount(){
        try{
            this.fetchItems(this.state.table_name);
            this.fetchFieldnames(this.state.table_name);
        }catch(err){
            console.error(err);
        }
    }

    itemChecked(item){
        console.log(item);
    }

    render(){

        const {fieldnames} = this.state;
        const {items} = this.state;
                
        //console.log(this.state.fieldnames)
        //console.log(this.state.columns)

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
                                        <Checkbox></Checkbox>
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