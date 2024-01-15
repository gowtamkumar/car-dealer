import React, { useEffect, useState } from 'react'
import config from 'src/config'
import { Form, Input, Modal, Select } from 'antd'
import { Upload } from 'antd'
import { ActionType } from '../../../constants/constants'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Create, CreateFile, FileDeleteWithPhoto, Update } from '../../../lib/api'
import { useRouter } from 'next/navigation'

const AddBrand = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)

  // oparetion
  const { payload: data } = action
  const [form] = Form.useForm()
  const router = useRouter()


  useEffect(() => {
    const newData = { ...data }
    if (newData.logo) {
      const file = {
        uid: Math.random() * 1000 + '',
        name: 'logo',
        status: 'done',
        url: `${config.apiBaseUrl}/uploads/${data.logo || 'no-data.png'}`,
      }
      newData.fileList = [file]
    }
    setFormData(newData)
    return () => {
      setFormValues({})
      form.resetFields()
    }
  }, [data])

  const handleSubmit = async (values) => {
    let newData = { ...values }
    if (newData.fileName) delete newData.fileName
    // return console.log('newData:', newData)
    setLoading({ save: true })
    setTimeout(async () => {
      const params = { api: 'brands', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      setLoading({ save: false })
      router.refresh()
      toast.success(`Brand ${newData?.id ? 'Updated' : 'Created'} Successfully`)
      setAction({})
    }, 100)
  }

  const uploadButton = (
    <div>
      {loading.upload ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload</div>
    </div>
  )

  const handleClose = () => {
    setAction({})
    setLoading({})
  }

  const setFormData = (v) => {
    const newData = { ...v }
    form.setFieldsValue(newData)
    setFormValues(form.getFieldsValue())
  }

  const resetFormData = () => {
    form.resetFields()
    if (data?.id) {
      const newData = { ...data }
      if (data.logo) {
        const file = {
          uid: Math.random() * 1000 + '',
          name: 'logo',
          status: 'done',
          url: `${config.apiBaseUrl}/uploads/${data.logo || 'no-data.png'}`,
        }
        newData.fileList = [file]
      }
      form.setFieldsValue(newData)
    }
    setFormValues(form.getFieldsValue())
  }

  const customUploadRequest = async (options) => {
    const { filename, file, onSuccess, onError } = options
    const fmData = new FormData()
    fmData.append(filename, file)

    try {
      const res = await CreateFile(fmData)
      if (res.photo.length) {
        setFormData({ fileName: res.photo[0]?.filename, logo: res.photo[0]?.filename })
      }
      onSuccess('Ok')
    } catch (err) {
      const error = new Error('Upload error')
      onError({ err })
    }
  }

  const normFile = ({ file, fileList }) => {
    if (file.status === 'removed') {
      setFormData({ photo: null })
    }
    return fileList
  }

  return (
    <Modal
      title={action.type === ActionType.UPDATE ? 'Update Make' : 'Create Make'}
      width={500}
      zIndex={1050}
      open={action.type === ActionType.CREATE || action.type === ActionType.UPDATE}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        onValuesChange={(_v, values) => setFormValues(values)}
        autoComplete="off"
        scrollToFirstError={true}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="fileName" hidden>
          <Input />
        </Form.Item>


        <div className="my-5 flex items-start justify-between gap-4">
          <div>
            <Form.Item
              className="mb-1"
              label="Make Logo"
              name="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="photo"
                listType="picture-card"
                fileList={formValues.fileList || []}
                className="avatar-uploader"
                customRequest={customUploadRequest}
                onChange={async (v) => {
                  if (!v.fileList.length) {
                    if (formValues?.fileName) {
                      const params = { api: 'file-delete', data: { photo: formValues.fileName } }
                      await FileDeleteWithPhoto(params)
                    }
                  }
                }}

              >
                {formValues.fileList?.length ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="logo" hidden>
              <Input />
            </Form.Item>
          </div>
          <div className="grid flex-grow grid-cols-1 gap-5">
            <div className="col-span-1">
              <Form.Item
                name="name"
                className="mb-1"
                label="Make Name"
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}
              >
                <Input placeholder="Enter Brand Name" />
              </Form.Item>
            </div>
            <div className={`col-span-1 `}>
              <Form.Item hidden={!data?.id} name="isActive" label="Status" className="mb-1">
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value={true}>
                    Active
                  </Select.Option>
                  <Select.Option value={false}>
                    Inactive
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-1 text-end">
              <Button variant="text" className="mx-2 capitalize" size="sm" onClick={resetFormData}>
                Reset
              </Button>
              <Button
                size="sm"
                variant="gradient"
                color="blue"
                type="submit"
                className="capitalize"
                loading={loading.submit}
              >
                {formValues.id ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Modal >
  )
}

export default AddBrand
