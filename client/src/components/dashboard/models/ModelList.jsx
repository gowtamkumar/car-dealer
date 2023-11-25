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

const ModelList = ({ models, setAction }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState({})
  // const [models, setModels] = useState([])

  // query
  const dt = useRef(null)


  const handleDelete = async (id) => {
    setTimeout(async () => {
      const params = { api: 'models', id }
      setLoading({ ...loading, [`delete_${id}`]: true })
      const result = await Delete(params)
      setLoading({ [`delete_${id}`]: false })
      if (result.error) toast.error(result.error.data.message)
      setAction({})
      toast.success('Model deleted successfully')
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
    const { isActive, logo } = rowData

    switch (field) {
      case 'logo':
        return (
          <Image
            alt=""
            width={30}
            height={30}
            preview={false}
            className="rounded-pill shadow-sm"
            src={`${appConfig.apiBaseUrl}/uploads/${logo || 'user.png'} `}
          />
        )

      case 'isActive':
        return <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>

      case 'action':
        return (
          <div>
            <Button
              size="small"
              icon={<FormOutlined />}
              title="Edit"
              className="me-1"
              onClick={() => setAction({ type: ActionType.UPDATE, payload: rowData })}
            />
            <Popconfirm
              title={
                <span>
                  Are you sure <span className="text-danger fw-bold">delete</span> this Model?
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
        value={models || []}
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
            {false ? ( // loading
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
        <Column className="border" field="name" header="Name" />
        <Column className="border" field="brand.name" header="Brand Name" />
        <Column style={{ width: "100px" }} className="border" header="Status" body={(rowData) =>
          bodyTemplate({ rowData, field: 'isActive' })
        } />
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

export default ModelList
