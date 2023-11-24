'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  FormOutlined,
  RestOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  QuestionCircleOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { ActionType } from '../../../lib/constants'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, Tag, Empty, Popconfirm } from 'antd'
import { Input, Spinner } from '@material-tailwind/react'
import { Gets } from '../../../lib/api'
import { useRouter } from 'next/navigation'

const CarList = ({ filter, setAction }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState({})
  const [cars, setCars] = useState([])

  // query
  const dt = useRef(null)
  const router = useRouter()

  useEffect(() => {
    ; (async () => {
      const params = { api: 'products' }
      const res = await Gets(params)
      if (filter) {
        const newData = res.data.filter((item) => item.status === filter)
        setCars(newData)
      } else {
        setCars(res.data)
      }
    })()
  }, [filter])

  const handleDelete = async (id) => {
    setTimeout(async () => {
      const params = { api: 'users', id }
      setLoading({ ...loading, [`delete_${id}`]: true })
      const result = await Delete(params)
      setLoading({ [`delete_${id}`]: false })
      if (result.error) toast.error(result.error.data.message)
      setAction({})
      toast.success('Car deleted successfully')
    }, 300)
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
    console.log("status:", status)

    switch (field) {

      case 'status':
        return <Tag color={status === 'Pending' ? 'gold' : status === "Rejected" ? 'red' : 'green'}>{status}</Tag>

      case 'sl':
        return <span>{rowIndex + 1}</span>

      case 'action':
        return (
          <div>
            <Button
              title="View"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => setAction({ type: ActionType.VIEW, payload: rowData })}
            />
            <Button
              size="small"
              icon={<FormOutlined />}
              title="Edit"
              className="mx-1"
              onClick={() => router.push(`/dashboard/add-product/${rowData.id}`)}
            />
            <Popconfirm
              title={
                <span>
                  Are you sure <span className="text-danger fw-bold">delete</span> this Car?
                </span>
              }
              onConfirm={() => handleDelete(rowData.id)}
              placement="left"
              okText="Yes"
              okType="danger"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button
                size="small"
                className="delIcon"
                loading={loading[`delete_${rowData.id}`]}
                icon={<RestOutlined />}
              />
            </Popconfirm>
          </div>
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
            onChange={({ target }) => setGlobalFilter(target.value)}
            label="Search"
          />
        </div>
      </div>
      <DataTable
        value={cars || []}
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
            {!cars ? (
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
          header="#"
          className="w-[20px] border"
          body={(rowData, { rowIndex }) => bodyTemplate({ rowData, rowIndex, field: 'sl' })}
        />
        <Column className="border" field="name" header="Name" />
        <Column className="border" field="brand.name" header="Brand" />
        <Column className="border" field="model.name" header="Model" />
        <Column className="border" field="modelCode.name" header="Model Code" />
        <Column className="border" field="condition" header="Condition" />
        <Column className="border" field="fuelType" header="Fuel Type" />
        <Column className="border" field="status" header="Status" body={(rowData, { field }) => bodyTemplate({ rowData, field })} />
        <Column
          header="Option"
          className="w-[10px] border text-center"
          body={(rowData, { rowIndex }) => bodyTemplate({ rowData, field: 'action' })}
        />
      </DataTable>
    </main>
  )
}

export default CarList
