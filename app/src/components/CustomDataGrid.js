import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
const CustomDataGrid = ({
  rows,
  columns,
  selectionModel,
  setSelectionModel,
}) => {
  return (
    <DataGrid
      sx={{ height: 400, width: '100%' }}
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      onSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
    />
  );
};

export default CustomDataGrid;
