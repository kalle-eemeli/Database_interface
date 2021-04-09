import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody } from '@material-ui/core';

export default class MaterialTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            table_name: this.props.table,
            items: [],
            columns: [],
            fieldnames: [],
            rows: [],
            itemsLoaded: false,
            columnsLoaded: false
        }
    }
    
    selectAllEntries = async (table) => {
        await fetch(`http://localhost:9000/utils/selectall/${table}/`)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                items: result,
                itemsLoaded: true
            }))
        })
    }

    getColumns = async (table_name) => {
        await fetch(`http://localhost:9000/utils/${table_name}/`)
        .then(res => res.json())
        .then(result => {
            this.setState( prevState =>({
                fieldnames: result,
                columnsLoaded: true,
              }))
        })
    }

    componentDidMount(){
        this.selectAllEntries(this.state.table_name);
        this.getColumns(this.state.table_name);
    }



    render(){

        console.log(this.state.fieldnames)
        console.log(this.state.columns)

        if (!this.state.columnsLoaded || !this.state.itemsLoaded) {
            return (
                <div>
                    {this.state.columns.map(col => {
                        return (
                            <div>
                                col
                            </div>
                        )
                    })}
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