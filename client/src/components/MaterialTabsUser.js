import React from 'react';
import {Tabs,Tab,AppBar} from '@material-ui/core';
import UserForm from './forms/UserV2';
import Tracking from './forms/Tracking';
import MaterialTable from './MaterialTable';

export default function MaterialTabsUser(props) {
    const [value, setValue] = React.useState(0);
    const handleTabs=(e, val) => {
      setValue(val);
    }

    const {tables} = props;

    return (
        <div>
            <h1>USER VIEW</h1>
            <AppBar position="static">
                <Tabs value={value} onChange={handleTabs} variant="scrollable">
                    {/* {tables.map((table, i) => (
                        <Tab key={i} label={table.TABLE_NAME}/>
                    ))} */}
                    <Tab key={1} label="User"></Tab>
                    <Tab key={2} label="Tracking"></Tab>
                    <Tab key={3} label="ProjectOverview"></Tab>
                </Tabs>
            </AppBar>
            {/* {tables.map((table, i) => (
                <TabPanel key={i} value={value} index={i}>
                    <TableView table={table.TABLE_NAME}/>
                    <MaterialTable table={table.TABLE_NAME}/>
                </TabPanel>
            ))} */}
            <TabPanel key={1} value={value} index={0}>
                <UserForm></UserForm>
            </TabPanel>
            <TabPanel key={2} value={value} index={1}>
                <Tracking></Tracking>
            </TabPanel>
            <TabPanel key={3} value={value} index={2}>
            <h3>Project Overview</h3>
                <MaterialTable table="Project" update_form={false}/>
            </TabPanel>
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