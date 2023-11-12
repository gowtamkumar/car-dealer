'use client'
import React, { useRef, useState } from 'react'
import {
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { BsFileExcel } from 'react-icons/bs'
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineFileExcel,
  AiOutlineForm,
  AiOutlineRest,
} from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

const ProductList = () => {
  const [loading, setLoading] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const dt = useRef(null)

  const handleDelete = async (id) => {
    setLoading({ ...loading, [`delete_${id}`]: true })
    return
    // setTimeout(async () => {
    //   const result = await deleteDiscount(id)
    //   setLoading({ [`delete_${id}`]: false })
    //   if (result.error) errorMsg(result.error.data.message)
    //   setAction({})
    //   successMsg('Discount deleted successfully')
    // }, 300)
  }

  const exportCSV = (selectionOnly) => {
    setLoading({ exportCsv: true })
    setTimeout(() => {
      dt.current.exportCSV({ selectionOnly })
      setLoading({})
    }, 500)
  }

  // jsx funcitons
  const bodyTemplate = ({ rowData, field, rowIndex }) => {
    const { status } = rowData
    console.log('status:', status)
    // Pending = 'Pending',
    // Approved = 'Approved',
    // Rejected = 'Rejected',

    switch (field) {
      case 'status':
        return status === 'Approved' ? (
          <small className="rounded-md border border-green-600 px-2 py-1 text-sm font-semibold text-green-500">
            {status}
          </small>
        ) : status === 'Rejected' ? (
          <small className="rounded-md border border-red-600 px-2 py-1 text-sm font-semibold text-red-500">
            {status}
          </small>
        ) : (
          <small className="rounded-md border border-yellow-600 px-2 py-1 text-sm font-semibold text-yellow-500">
            {status}
          </small>
        )
      case 'action':
        return (
          <Menu>
            <MenuHandler>
              <div className="flex cursor-pointer items-center gap-1">
                <span>{rowIndex + 1}</span> <BiDotsHorizontalRounded />
              </div>
            </MenuHandler>
            <MenuList className="max-w-[200px] p-1">
              <MenuItem className="py-0">
                <IconButton size="sm" variant="text">
                  <AiOutlineEye size={20} />
                </IconButton>
                View
              </MenuItem>
              <MenuItem className="py-0">
                <IconButton size="sm" variant="text">
                  <AiOutlineForm size={20} />
                </IconButton>
                Update
              </MenuItem>
              <MenuItem color="red" className="py-0">
                <IconButton color="red" size="sm" variant="text">
                  <AiOutlineRest size={20} />
                </IconButton>
                <span className="text-red-400"> Delete</span>
              </MenuItem>
            </MenuList>
          </Menu>
        )
      default:
        return null
    }
  }

  return (
    <div className="border-b">
      {/* <div className="flex items-center justify-between border-b py-2 lg:hidden">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Button color="red" size="sm" variant="gradient" className="capitalize">
          Add Product
        </Button>
      </div> */}

      <div className="my-3 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex flex-grow items-center justify-start gap-3 py-3">
          <div className="cursor-pointer rounded-md bg-blue-100 px-2 py-1 font-bold text-blue-700">
            Approved
          </div>
          <div className="cursor-pointer rounded-md px-2 py-1 font-bold hover:bg-blue-100 hover:text-blue-700">
            Pendding
          </div>
          <div className="cursor-pointer rounded-md px-2 py-1 font-bold hover:bg-blue-100 hover:text-blue-700">
            Rejected
          </div>
        </div>

        <div className="flex items-center gap-4">
          <IconButton
            size="sm"
            variant="text"
            className="mx-1"
            title="Export Csv"
            onClick={() => exportCSV(false)}
            loading={loading.exportCsv}
          >
            <AiOutlineFileExcel size={20} />
          </IconButton>
          <Input
            type="search"
            className="p-1"
            containerProps={{
              className: 'min-w-[200px] focus:border-[1px]',
            }}
            onInput={({ target }) => setGlobalFilter(target.value)}
            label="Search here..."
          />
        </div>
      </div>
      <DataTable
        value={[
          {
            name: 'Product Name 1',
            brand: { name: 'Brand' },
            model: { name: 'Model' },
            year: '2017',
            price: '10,10,000',
            status: 'Rejected',
          },
        ]}
        paginator={true}
        rows={10}
        rowsPerPageOptions={[10, 50, 100, 200]}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rowHover
        showGridlines
        stripedRows={true}
        sortMode="multiple"
        responsive="true"
        resizableColumns={true}
        columnResizeMode="expand"
        globalFilter={globalFilter}
        emptyMessage={<div className="text-center">{true ? 'loading..' : 'No records found'}</div>}
        // header={header}
        ref={dt}
        className="p-datatable-sm rounded-md border text-center"
      >
        <Column
          header=""
          className="text-center"
          style={{ width: '10px' }}
          body={(rowData, { rowIndex, field }) =>
            bodyTemplate({ rowData, rowIndex, field: 'action' })
          }
        />
        <Column field="name" header="Name" />
        <Column field="brand.name" header="Brand" />
        <Column field="model.name" header="Model" />
        <Column field="year" header="Year" />
        <Column field="price" header="Price" />
        <Column field="user.name" header="Post By" />
        <Column
          field="status"
          header="Status"
          body={(rowData, { field }) => bodyTemplate({ rowData, field })}
        />
      </DataTable>
    </div>
  )
}

export default ProductList
