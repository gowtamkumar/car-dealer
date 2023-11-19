import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Upload } from 'antd'
import { ActionType } from '../../../lib/constants'
import { Button } from '@material-tailwind/react'
import { Create, Update } from '../../../lib/api'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import createFile from '../../../lib/createFile'
import appConfig from '../../../config'

const AddUser = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { payload: data = {} } = action
  const [form] = Form.useForm()

  // Mutation

  useEffect(() => {
    const newData = { ...data }
    if (newData.photo) {
      const file = {
        uid: Math.random() * 1000 + '',
        name: 'photo',
        status: 'done',
        url: `${appConfig.apiBaseUrl}/uploads/${data?.photo}`,
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
      if (result.error) return toast.error(`Error`)
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
    const newData = { ...data }
    if (data?.id) {
      if (data.photo) {
        const file = {
          uid: Math.random() * 1000 + '',
          name: 'photo',
          status: 'done',
          url: `${appConfig.apiBaseUrl}/uploads/${data?.photo}`,
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
      console.log('res:', res)
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
      zIndex={1050}
      width={500}
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
        <Form.Item noStyle className="mb-1" name="id" hidden>
          <Input />
        </Form.Item>

        <div className="my-3 grid grid-cols-2 gap-5">
          <div className="col-span-2 text-center">
            <Form.Item className="mb-1" name="fileList" getValueFromEvent={normFile}>
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
          <div className="col-span-2">
            <Form.Item
              className="mb-1"
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                },
              ]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>

            <Form.Item
              className="mb-1"
              name="username"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: 'User Name is required',
                },
              ]}
            >
              <Input placeholder="Enter User Name" />
            </Form.Item>
            {data.id ? null : (
              <Form.Item
                className="mb-1"
                name="password"
                label="Password"
                hidden={data.id}
                rules={[
                  {
                    required: true,
                    message: 'Password is required',
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
            )}

            <Form.Item className="mb-1" name="phone" label="Phone">
              <Input placeholder="Enter Phone" />
            </Form.Item>

            <Form.Item className="mb-1" name="email" label="Email">
              <Input placeholder="Enter Email" />
            </Form.Item>
          </div>

          <div className="col-span-3 text-end">
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
      </Form>
    </Modal>
  )
}

export default AddUser
