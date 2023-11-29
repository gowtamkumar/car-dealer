'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  FormOutlined,
  RestOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import { ActionType } from '../../../constants/constants'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, Tag, Empty, Popconfirm } from 'antd'
import { Input, Spinner } from '@material-tailwind/react'
import { Gets } from '../../../lib/api'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import appConfig from '../../../config'

const CarList = ({ cars, setAction }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState({})

  // query
  const dt = useRef(null)
  const router = useRouter()
  const { data } = useSession()
  const { user } = data || {}

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
    const { status, user } = rowData

    switch (field) {
      case 'sl':
        return <span>{rowIndex + 1}</span>

      case 'status':
        return (
          <Tag color={status === 'Pending' ? 'gold' : status === 'Rejected' ? 'red' : 'green'}>
            {status}
          </Tag>
        )

      case 'user.name':
        return (
          <div className="flex items-center justify-start gap-3">
            <img
              alt=""
              className="h-9 w-9 rounded-full shadow-sm"
              src={`${appConfig.apiBaseUrl}/uploads/${user?.photo || 'user.png'} `}
            />
            <div>
              <h1 className="text-sm">{user?.name}</h1>
              <span className="text-xs">{user?.phone}</span>
            </div>
          </div>
        )

      case 'action':
        return (
          <div>
            {['Admin', 'Operator'].includes(data?.user?.role) && (
              <Button
                title="Switch"
                size="small"
                icon={<SwapOutlined />}
                className="mx-1"
                onClick={() => setAction({ type: ActionType.APPROVE, payload: rowData })}
              />
            )}
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
                danger
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
          <Button disabled size="small" icon={<PrinterOutlined />}></Button>
          <Button
            size="small"
            className="mx-1"
            title="Export Csv"
            onClick={() => exportCSV(false)}
            loading={loading.exportCsv}
            icon={<FileExcelOutlined />}
          />
          <Button
            size="small"
            className="me-5"
            disabled
            title="Export Pdf"
            icon={<FilePdfOutlined />}
          />
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
        {['Admin', 'Operator'].includes(user?.role) ? null : (
          <Column
            header="#"
            className="w-[20px] border"
            body={(rowData, { rowIndex }) => bodyTemplate({ rowData, rowIndex, field: 'sl' })}
          />
        )}
        {['Admin', 'Operator'].includes(user?.role) && (
          <Column
            className="border"
            field="user.name"
            body={(rowData, { field }) => bodyTemplate({ rowData, field })}
            header="Post By"
          />
        )}
        <Column className="border" field="name" header="Name" />
        <Column className="border" field="brand.name" header="Brand" />
        <Column className="border" field="model.name" header="Model" />
        <Column className="border" field="modelCode.name" header="Model Code" />
        <Column className="border" field="condition" header="Condition" />
        <Column className="border" field="fuelType" header="Fuel Type" />
        <Column
          className="border"
          field="status"
          header="Status"
          body={(rowData, { field }) => bodyTemplate({ rowData, field })}
        />
        <Column
          header="Option"
          className="w-[10px] border text-center"
          body={(rowData) => bodyTemplate({ rowData, field: 'action' })}
        />
      </DataTable>
    </main>
  )
}

export default CarList
