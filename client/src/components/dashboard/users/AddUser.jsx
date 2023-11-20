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

const AddUser = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { payload: data } = action
  const [form] = Form.useForm()

  // Mutation

  useEffect(() => {
    const newData = { ...data }
    if (newData.photo) {
      const file = {
        uid: Math.random() * 1000 + '',
        name: 'photo',
        status: 'done',
        url: `${config.apiBaseUrl}/uploads/${data?.photo}`,
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
      const params = { api: 'users', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      setLoading({ save: false })
      toast.success(`User ${newData?.id ? 'Updated' : 'Created'} Successfully`)
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
      if (data.photo) {
        const file = {
          uid: Math.random() * 1000 + '',
          name: 'photo',
          status: 'done',
          url: `${config.apiBaseUrl}/uploads/${data?.photo}`,
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
        setFormData({ photo: res.photo[0]?.filename })
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
      title={action.type === ActionType.UPDATE ? 'Update User' : 'Create User'}
      width={650}
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

        <div className="flex items-start justify-between gap-5">
          <div>
            <Form.Item
              className="mb-1"
              label="User Photo"
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

            <Form.Item noStyle name="photo" hidden>
              <Input />
            </Form.Item>
          </div>
          <div className="grid flex-grow grid-cols-2 gap-2">
            <div className="col-span-1">
              <Form.Item
                name="name"
                label="Full Name"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>
            </div>

            <div className="col-span-1">
              <Form.Item
                name="username"
                label="User Name"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'UserName is required',
                  },
                ]}
              >
                <Input placeholder="Enter User Name" />
              </Form.Item>
            </div>

            <div className={`col-span-2 ${data?.id && 'hidden'}`}>
              <Form.Item
                name="password"
                label="Password"
                className="mb-1"
                hidden={data?.id}
                rules={[
                  {
                    required: true,
                    message: 'Password is required',
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
            </div>

            <div className="col-span-1">
              <Form.Item
                name="phone"
                label="Phone"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'Phone No is required',
                  },
                  {
                    pattern: /^(?:\+88|01)?(?:\d{11}|\d{13})$/i,
                    message: 'Wrong format!',
                  },
                ]}
              >
                <Input placeholder="Enter Phone" />
              </Form.Item>
            </div>

            <div className="col-span-1">
              <Form.Item
                name="email"
                label="Email"
                className="mb-1"
                rules={[
                  {
                    type: 'email',
                    message: 'Wrong format!',
                  },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>
            </div>

            <div className="col-span-2">
              <Form.Item name="role" label="Role" className="mb-1">
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Role"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {['Admin', 'Operator', 'Seller'].map((item, idx) => (
                    <Select.Option key={idx} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-2 text-end">
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

export default AddUser
