// DataTable.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { Button } from '@mui/material';

import { initializeDatabase } from './userReducer';

function DataTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const columns = [
    { label: 'Name', name: 'name' },
    { label: 'Age', name: 'age' },
    { label: 'Sex', name: 'sex' },
    { label: 'Mobile', name: 'mobile' },
    { label: 'Govt ID Type', name: 'govtIdType' },
    { label: 'Govt ID', name: 'govtId' },
    { label: 'Address', name: 'address' },
    { label: 'State', name: 'state' },
    { label: 'City', name: 'city' },
    { label: 'Country', name: 'country' },
    { label: 'Pincode', name: 'pincode' },
  ];

  const options = {
    responsive: 'vertical',
  };

  const handleInitializeDatabase = () => {
    dispatch(initializeDatabase());
  };

  return (
    <div>
      <MUIDataTable data={users} columns={columns} options={options} />
      <Button onClick={handleInitializeDatabase} variant="contained" color="primary">
        Initialize Database
      </Button>
    </div>
  );
}

export default DataTable;
