import React from 'react';

class ClickableList extends React.Component{
    constructor(props){
      super(props);
      //this.handleClick = this.handleClick.bind(this);
      this.state={
        tablename: this.props.table,
        fieldnames: [],
        items: []
      };
      
    }
  
    // // handleClick(event) {
    // //   console.log(event.target);
    // //   console.log(this.props.item.id);
    // //   this.deleteData('http://localhost:9000/test/', this.props.item.id);
    // // }
  
    selectAllEntries = async (table) => {
      await fetch(`http://localhost:9000/utils/selectall/${table}/`)
      .then(res => res.json())
      .then(result => {
        this.setState( prevState =>({
          //isLoaded: true,
          items: result
        }))
      })
      //console.log(this.state.items)
    }
  
    selectAllFields = async (table_name) => {
      await fetch(`http://localhost:9000/utils/${table_name}/`)
      .then(res => res.json())
      .then(result => {
        this.setState( prevState =>({
          //isLoaded: true,
          fieldnames: result
        }))
      })
    }
  
    componentDidMount(){
      this.selectAllEntries(this.state.tablename);
      this.selectAllFields(this.state.tablename);
    }
  
    render () {
  
      return (
        <div>
          <div className="TableBlock">
            <div>
              <h2>{this.state.tablename}</h2>
            </div>
          <div>
            {this.state.items.map(item => {
              return (
                <ol key={item.id}>
                  {this.state.fieldnames.map(field => {
                    const col = field.COLUMN_NAME;
                    return <li><b>{col}:</b><br />{item[`${col}`] || "-"}</li>
                  })}
                </ol>
              )
            })}
          </div>
          </div>
        </div>
      )
    }
}

export default ClickableList;