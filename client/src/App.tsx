import { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridRowSelectionModel, GridSortItem, GridSortModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Loading from './components/Loading';
import Notificaiton from './components/Notificaiton';
import useUsers from "./hooks/useUsers";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
];

export default function App() {
  const [selected, setSelected] = useState<GridRowSelectionModel>([]);
  const { users, setUsersSort, isLoadingUser, usersSortModel, resetSortModel, usersPagination, setUsersPagination, getUsers } = useUsers();
  const handleSort = (sortModel: GridSortModel) => {
    const sort = sortModel[0];
    sort ? setUsersSort(sort) : resetSortModel();
  }

  const handlPagination = (paginationModel: GridPaginationModel) => {
   setUsersPagination((prev) => ({ ...prev, page: paginationModel.page, take: paginationModel.pageSize }));
  }

  return (
    <>
      <Loading />
      <Notificaiton />
      <div style={{ width: '80%', margin: '0px auto', marginTop: '48px' }}>
        <Button variant="contained" onClick={getUsers} sx={{ marginBottom: 2 }}>search</Button>
        <DataGrid
          getRowId={(user) => user.id}
          autoHeight
          rows={users}
          columns={columns}
          paginationModel={{
            page: usersPagination.page,
            pageSize: usersPagination.take,
          }}
          onPaginationModelChange={handlPagination}
          pageSizeOptions={[5, 10, 15, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={(newSelected) => setSelected(newSelected)}
          rowSelectionModel={selected}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnMenu
          onSortModelChange={handleSort}
          sortModel={[usersSortModel] as GridSortItem[]}
          loading={isLoadingUser}
          sortingMode='server'
          paginationMode='server'
          rowCount={usersPagination.totalItems}
        />
      </div>
    </>
  );
}
