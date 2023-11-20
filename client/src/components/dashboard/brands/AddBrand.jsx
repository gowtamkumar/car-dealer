import React, { useEffect, useState } from 'react'
import config from 'src/config'
import { Form, Input, Modal, Select } from 'antd'
import { Upload } from 'antd'
import { ActionType } from '../../../lib/constants'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Create, Update } from '../../../lib/api'
import createFile from '../../../lib/createFile'

const AddBrand = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { payload: data } = action
  const [form] = Form.useForm()

  // Mutation

  useEffect(() => {
    const newData = { ...data }
    if (newData.logo) {
      const file = {
        uid: Math.random() * 1000 + '',
        name: 'logo',
        status: 'done',
        url: `${config.apiBaseUrl}/uploads/${data?.logo}`,
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
    // return console.log('newData:', newData)

    setLoading({ save: true })
    setTimeout(async () => {
      const params = { api: 'brands', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      setLoading({ save: false })
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
          url: `${config.apiBaseUrl}/uploads/${data?.logo}`,
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
      const res = await createFile(fmData)
      if (res.photo.length) {
        setFormData({ logo: res.photo[0]?.filename })
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
      title={action.type === ActionType.UPDATE ? 'Update Brand' : 'Create Brand'}
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
        <Form.Item noStyle name="id" hidden>
          <Input />
        </Form.Item>

        <div className="my-5 flex items-start justify-between gap-4">
          <div>
            <Form.Item
              className="mb-1"
              label="Brand Logo"
              name="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="photo"
                listType="picture-card"
                fileList={formValues.fileList || []}
                className="avatar-uploader"
                customRequest={customUploadRequest}
              >
                {formValues.fileList?.length ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item noStyle name="logo" hidden>
              <Input />
            </Form.Item>
          </div>
          <div className="grid flex-grow grid-cols-1 gap-5">
            <div className="col-span-1">
              <Form.Item
                name="name"
                className="mb-1"
                label="Barnd Name"
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
              <Form.Item hidden={!data?.id} name="status" label="Status" className="mb-1">
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {['Active', 'Inactive'].map((item, idx) => (
                    <Select.Option key={idx} value={item}>
                      {item}
                    </Select.Option>
                  ))}
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
    </Modal>
  )
}

export default AddBrand
