import React from 'react';
import {Tabs,Tab,AppBar} from '@material-ui/core';
import App from '../App';
import TableView from './TableView';
import MaterialTable from './MaterialTable';

export default function MaterialTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleTabs=(e, val) => {
      setValue(val);
    }

    const {tables} = props;

    return (
        <div>
            <h1>MaterialTabs</h1>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabs} variant="scrollable">
                    {tables.map(table => (
                        <Tab label={table.TABLE_NAME}/>
                    ))}
                </Tabs>
            </AppBar>
            {tables.map((table, i) => (
                <TabPanel value={value} index={i}>
                    <TableView table={table.TABLE_NAME}/>
                    {/* <MaterialTable table={table.TABLE_NAME}/> */}
                </TabPanel>
            ))}
        </div>
    )
}

function TabPanel(props) {
    const {children, value, index}=props;
    return (
        <div>
            {value===index && (
                <div>{children}</div>
            )}
        </div>
    )
}