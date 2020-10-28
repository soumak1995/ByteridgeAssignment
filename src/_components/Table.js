import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
export default function Table({users,deleteUser}) {
    const columns=[
        {dataField:"_id",text:"Id", 
        headerStyle: () => {
            return { width: "30%" };
          }},
        {dataField:"role",text:"Role"},
        {dataField:"createdDate",text:"CreatedDate", sort: true,
        formatter: (_, col) => {
            return new Date(col.createdDate).toLocaleString();
        }},
        {dataField:"firstName",text:"firstName"},
        {dataField:"lastName",text:"lastname"},
        {dataField:"",text:"Delete",
        formatter: (_, col) => {
            return col.deleting ? <em> - Deleting...</em>
            : col.deleteError ? <span className="text-danger"> - ERROR: {col.deleteError}</span>
                : <span> <a onClick={handleDeleteUser(col.id)}>Delete</a></span>
        }},
    ];
    handleDeleteUser=(id)=> {
        return (e) => deleteUser(id);
    }
    return  <BootstrapTable
    keyField="_id"
    data={users.items}
    columns={columns}
    pagination={paginationFactory()
    }
    />
}
