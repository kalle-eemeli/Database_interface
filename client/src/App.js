import React from 'react';
import './App.css';
import MaterialTabs from './components/MaterialTabs';
import MaterialTabsUser from './components/MaterialTabsUser';

import { SERVER_URL, ROUTES } from './config.json';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded: false,
      items: [],
      tables: []
    };
  }

  selectAllTables = async () => {

    const url = SERVER_URL.concat(ROUTES.UTILS);

    await fetch(url, {method: 'GET', cache: 'no-cache'})
    .then(res => res.json())
    .then(result => {
      this.setState({
        isLoaded: true,
        tables: result
      })
    })
  }

  handleClick(id) {
    this.deleteData('http://localhost:9000/Person/', id);
  }

  deleteData = async (url='', id) => {
    const response = await fetch(url + id, {
      method: 'DELETE',
    });
    return response.json();
  }

  componentDidMount(){
    this.selectAllTables();
  }

  render(){

    const {tables} = this.state;
    const {isLoaded} = this.state;
    

    if (!isLoaded) {
      return <div>Loading...<MaterialTabsUser></MaterialTabsUser></div>;
    } else {
      return (
        <div className="MainView">
          {/* <h2>LIST OF CURRENT ENTITYS (limited to 5)</h2> */}
            {/* <ul className="horizontalContainer">
              {tables.map(table => (
                //<ClickableList table={table.TABLE_NAME} handler={this.handleClick.bind(this)}/>
                <li key={table.TABLE_NAME}>
                  <TableView table={table.TABLE_NAME}/>
                </li>
              ))}
            </ul> */}
            <MaterialTabsUser></MaterialTabsUser>
            <MaterialTabs tables={tables}></MaterialTabs>
          {/* <div className="Forms">
            <h2>ADD NEW ENTRY TO DATABASE</h2>
            <InsertForm />
          </div> */}
        </div>
      );
    }
  }
}

export default App;
