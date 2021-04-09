import React from 'react';
import './App.css';
import MaterialTabs from './components/MaterialTabs';
import TableView from './components/TableView';

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
    await fetch('http://localhost:9000/utils/', {method: 'GET', cache: 'no-cache'})
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
      return <div>Loading...</div>;
    } else {
      return (
        <div className="MainView">
          <h2>LIST OF CURRENT ENTITYS (limited to 5)</h2>
            {/* <ul className="horizontalContainer">
              {tables.map(table => (
                //<ClickableList table={table.TABLE_NAME} handler={this.handleClick.bind(this)}/>
                <li key={table.TABLE_NAME}>
                  <TableView table={table.TABLE_NAME}/>
                </li>
              ))}
            </ul> */}
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

class InsertForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const fn = this.state.firstname;
    const ad = this.state.address;
    const ln = this.state.lastname;

    this.postData('http://localhost:9000/Person/', {first_name: fn, last_name: ln, address: ad}).then(data => console.log(data));

  }

  handleChange(event) {

    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  postData = async (url='', data={}) => {
    const response = await fetch(url, {
      method: 'POST',
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
    });
    return response.json();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Firstname:<br />
          <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}></input>
        </label>
        <br />
        <label>
          Lastname:<br />
          <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}></input>
        </label>
        <br />
        <label>
          Address:<br />
          <input type="text" name="address" value={this.state.address} onChange={this.handleChange}></input>
        </label>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    )
  }
}


export default App;
