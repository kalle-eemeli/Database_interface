import { Container, Button } from '@material-ui/core';
import React from 'react';
import TableRow from './TableRow';

class TableView extends React.Component{
    constructor(props){
      super(props);
      this.state={
        itemsLoaded: false,
        fieldsLoaded: false,
        tablename: this.props.table,
        fieldnames: [],
        items: [],
        isUpdated: false,
      };
    }
  
    deleteData = async (table, id) => {
        const url = `http://localhost:9000/${table}/${id}/`;
        await fetch(
            url,
            {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache'
            }
        ).then(res => res.json())
        .then(result => console.log(result.message)).catch(error => console.log(error));
    }

    updateData = async (table, data={}) => {
        const url = `http://localhost:9000/${table}/${data.id}/`;
        await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(result => console.log(result.message)).catch(error => console.log(error));
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
  
    selectAllFields = async (table_name) => {
      await fetch(`http://localhost:9000/utils/${table_name}/`)
      .then(res => res.json())
      .then(result => {
        this.setState( prevState =>({
          fieldnames: result,
          fieldsLoaded: true,
        }))
      })
    }
  
    componentDidMount(){
      this.selectAllEntries(this.state.tablename);
      this.selectAllFields(this.state.tablename);
    }
  
    render (){
  
      const {items} = this.state;
      const {fieldnames} = this.state;
      const {tablename} = this.state;
      
      if(!this.state.itemsLoaded === true || !this.state.fieldsLoaded){
        return(<div>Loading...</div>)
      }
      else{
        return (
          <div>
            <h3 className="TableHeader">{this.state.tablename}</h3>
            <Button variant="contained">ADD NEW</Button>
            <Container>
              <ul>
                {items.map(item => {
                  return (
                    <li key={item.id}>
                      <TableRow fieldnames={fieldnames} item={item} typeoftable={tablename} updateHandler={this.updateData} deleteHandler={this.deleteData}/> 
                    </li>
                  )
                })}
              </ul>
            </Container>
          </div>
        )
      }
    }
  
}

export default TableView;