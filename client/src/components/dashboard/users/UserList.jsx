'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  EyeOutlined,
  FormOutlined,
  RestOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { ActionType } from '../../../constants/constants'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button, Tag, Popconfirm, Empty, Image } from 'antd'
import { Input, Spinner } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { Delete, Gets } from '../../../lib/api'
import appConfig from '../../../config'

const UserList = ({ users, setAction }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState({})

  // query
  const dt = useRef(null)

  const handleDelete = async (id) => {
    setTimeout(async () => {
      const params = { api: 'users', id }
      setLoading({ ...loading, [`delete_${id}`]: true })
      const result = await Delete(params)
      setLoading({ [`delete_${id}`]: false })
      if (result.error) toast.error(result.error.data.message)
      setAction({})
      toast.success('User deleted successfully')
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
  const bodyTemplate = ({ rowData, field }) => {
    const { status, photo, name } = rowData

    switch (field) {
      case 'name':
        return (
          <span className="flex items-center justify-start gap-2">
            <Image
              alt=""
              width={30}
              height={30}
              preview={false}
              className="rounded-full shadow-sm"
              src={`${appConfig.apiBaseUrl}/uploads/${photo || 'user.png'} `}
            />
            <span>{name}</span>
          </span>
        )

      case 'status':
        return <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>

      case 'action':
        return (
          <div>
            <Button
              size="small"
              icon={<FormOutlined />}
              title="Edit"
              className="me-1"
              onClick={() => setAction({ type: ActionType.UPDATE, payload: { ...rowData, fileName: rowData.photo } })}
            />
            <Popconfirm
              title={
                <span>
                  Are you sure <span className="text-danger fw-bold">delete</span> this User?
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
        value={users || []}
        paginator={true}
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 200]}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rowHover
        dataKey="id"
        showGridlines
        resizableColumns={true}
        columnResizeMode="expand"
        globalFilter={globalFilter}
        emptyMessage={
          <div className="text-center">
            {!users ? ( // loading
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
          className="border"
          field="name"
          header="Name"
          body={(rowData, { field }) => bodyTemplate({ rowData, field })}
        />
        <Column className="border" field="username" header="User Name" />
        <Column className="border" field="phone" header="Phone" />
        <Column className="border" field="role" header="Role" />
        <Column
          field="status"
          className="border"
          header="Status"
          body={(rowData, { field }) => bodyTemplate({ rowData, field })}
        />
        <Column
          header="Option"
          className="border text-center"
          style={{ width: '10px' }}
          body={(rowData, { rowIndex, field }) =>
            bodyTemplate({ rowData, rowIndex, field: 'action' })
          }
        />
      </DataTable>
    </main>
  )
}

export default UserList
