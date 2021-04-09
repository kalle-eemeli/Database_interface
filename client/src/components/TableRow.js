import React from 'react';
import TableForm from '../formfunc';
import Button from '@material-ui/core/Button';

class TableRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type: this.props.typeoftable,
            isUpdated: true,
            fieldnames: this.props.fieldnames,
            item: this.props.item,
            idfield: this.getID()
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    getID() {
        if (this.props.typeoftable === "Person"){
            return "personID";
        } else if (this.props.typeoftable === "Project")
        {
            return "projectID";
        } else {
            return null;
        }
    }

    handleClick = (e, id) => {
        if(e === "update"){
        this.setState({
            isUpdated: !this.state.isUpdated,
        })
        } else if(e === "delete"){
            if (window.confirm(`Are you sure you want to delete ${this.state.type} with ID: ${id} from the database?`)) {
                this.deleteData(id);
                console.log('Deleted');
            } else {
                console.log('Cancelled');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = event.name;

        this.setState(prevState => ({
        data: [...prevState.data, [name, target.value]]
        }));
    }

    deleteData = (id) => {
        this.props.deleteHandler(this.props.typeoftable, id);
    }

    handleSubmit = (event, data) => {
        event.preventDefault();
        this.props.updateHandler(this.props.typeoftable, data);

        //TODO: parse data object to update this components state
        this.setState({
            isUpdated: !this.state.isUpdated,
        });
    }

    render(){

        const {isUpdated} = this.state;
        const {fieldnames} = this.state;
        const {item} = this.state;
        const {idfield} = this.state;

        return(
            <div key={item.id}>
            {isUpdated ? (
                <div className="TableRow">
                {fieldnames.map((field, i) => {
                    return (
                        <p key={i}><b>{fieldnames[i].COLUMN_NAME}:</b>{item[field.COLUMN_NAME] || "-"}</p>
                    )
                })}
                </div>
            ) : (
                <div className="TableRowBeingUpdated">
                    {TableForm(this.state.type, item[idfield], item, this.handleSubmit)}
                </div>
            )}
            {idfield != null &&
                <div className="ButtonWrapper">
                    <Button variant="contained" onClick={() => this.handleClick("delete", item[idfield])}>DEL</Button>
                    <Button variant="contained" onClick={() => this.handleClick("update")}>UPD</Button>
                </div>
            }
            </div>
        )
    }
}

export default TableRow;