import { DataGrid } from '@material-ui/data-grid';

const Grid = ({ selected = [], data = [] }) => {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 0.5 },
    ];
    return (
        <div style={{ height: '370px', width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={data.filter(item => selected.includes(item.id))}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
            />
        </div>
    )
}

export default Grid;