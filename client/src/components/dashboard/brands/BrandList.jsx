'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  EyeOutlined,
  FormOutlined,
  RestOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'
import { ActionType } from '../../../lib/constants'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, Tag, Dropdown, Empty } from 'antd'
import { Input, Spinner } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { getBrands } from '../../../lib/brand'
import { Gets } from '../../../lib/api'

const BrandList = ({ status, setAction }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState({})
  const [brands, setBrands] = useState([])

  // query
  const dt = useRef(null)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const res = await Gets('brands')
      setBrands(res.data)
    })()
  }, [])

  const exportCSV = (selectionOnly) => {
    setLoading({ exportCsv: true })
    setTimeout(() => {
      dt.current.exportCSV({ selectionOnly })
      setLoading({})
    }, 500)
  }

  // jsx funcitons
  const bodyTemplate = ({ rowData, field, rowIndex }) => {
    const { isActive } = rowData

    const items = [
      {
        label: 'View',
        key: 'view',
        icon: <EyeOutlined />,
        onClick: () => setAction({ type: ActionType.VIEW, payload: rowData }),
      },
      {
        label: 'Update',
        key: 'update',
        icon: <FormOutlined />,
        onClick: () => setAction({ type: ActionType.UPDATE, payload: rowData }),
      },
      {
        label: 'Delete',
        key: 'delete',
        icon: <RestOutlined />,
        onClick: () => setAction({ type: ActionType.DELETE, payload: rowData }),
      },
    ]

    switch (field) {
      case 'isActive':
        return <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>

      case 'action':
        return (
          <Dropdown.Button
            size="small"
            trigger={['click']}
            placement="bottomLeft"
            type="ghost"
            menu={{ items }}
            onClick={() => setAction({ type: ActionType.VIEW, payload: rowData })}
          >
            <span className="mx-2">{rowIndex + 1}</span>
          </Dropdown.Button>
        )
      default:
        return null
    }
  }

  // rendering
  return (
    <main>
      <div className="flex items-center justify-between p-3">
        <div className="text-start">
          <Button size="small" icon={<PrinterOutlined />}></Button>
          <Button
            size="small"
            className="mx-1"
            title="Export Csv"
            onClick={() => exportCSV(false)}
            loading={loading.exportCsv}
            icon={<FileExcelOutlined />}
          />
          <Button size="small" className="me-5" title="Export Pdf" icon={<FilePdfOutlined />} />
        </div>
        <div className="text-end">
          <Input
            className="focus:border-1 p-1"
            onInput={({ target }) => setGlobalFilter(target.value)}
            label="Search"
          />
        </div>
      </div>
      <DataTable
        value={brands}
        paginator={true}
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 200]}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rowHover
        dataKey="id"
        sortMode="multiple"
        resizableColumns={true}
        columnResizeMode="expand"
        globalFilter={globalFilter}
        emptyMessage={
          <div className="text-center">
            {status === 'Rejected' ? (
              <div className="w-full text-center">
                <Spinner className="inline-block" />
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        }
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
        <Column
          field="logo"
          header="Logo"
          body={(rowData, { field }) => bodyTemplate({ rowData, field })}
        />
        <Column field="name" header="Name" />
        <Column field="status" header="Status" />
      </DataTable>
    </main>
  )
}

export default BrandList
