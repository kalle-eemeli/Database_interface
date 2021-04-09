import React from 'react';

function TableForm(type, id, item, handler){
    if(type === "Person"){
        return(
            <div>
                <PersonForm handler={handler} id={id} item={item} type={type}/>
            </div>
        )  

    }
    if(type === "Project"){
        return(
            <div>
                <ProjectForm />
            </div>
        )  

    }
    if(type !== "person" || type !== "project"){
        return(
            <div>
                <p>NONE</p>
            </div>
        )   
    }
    
}

class PersonForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            firstname:  this.props.item.firstName,
            lastname: this.props.item.lastName,
            address: this.props.item.address,
            phone: this.props.item.phoneNumber,
            email: this.props.item.email,
            availad: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getAvailableAddresses = async () => {
        var adds = [];
        await fetch('http://localhost:9000/Person/addresses/all')
        .then(res => res.json())
        .then(result => {
            this.setState({
                availad: result,
            })
        }).catch(error => {
            console.log(error);
        })

        return adds;
    }

    componentDidMount(){
        this.getAvailableAddresses();
    }

    handleChange(event){

        const target = event.target;
        const name = target.name;
    
        this.setState({
          [name]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        const data = {id: this.state.id, firstname: this.state.firstname, lastname: this.state.lastname, address: this.state.address, phone: this.state.phone, email: this.state.email};
        this.props.handler(event, data)
        
    }

    render(){

        const {firstname} = this.state;
        const {lastname} = this.state;
        const {address} = this.state;
        const {phone} = this.state;
        const {email} = this.state;
        const {id} = this.state;
        console.log(this.state.availad);

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={id}></input>
                    <label>
                        Firstname:<br />
                        <input type="text" name="firstname" value={firstname} onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Lastname:<br />
                        <input type="text" name="lastname" value={lastname} onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Address:<br />
                        <select name="address" value={address} onChange={this.handleChange}>
                            {this.state.availad.map(add => {
                                return(
                                    <option value={add["addressID"]}>{add["addressID"]}</option>
                                )
                            })}
                        </select>
                    </label>
                    <br />
                    <label>
                        PhoneNum:<br />
                        <input type="text" name="phone" value={phone} onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <label>
                        Email:<br />
                        <input type="text" name="email" value={email} onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
        
    }
}

class ProjectForm extends React.Component{
    render(){
        return(
            <div>
                
            </div>
        )
        
    }
}

export default TableForm;