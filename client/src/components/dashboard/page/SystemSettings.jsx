'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { Divider, Form, Input, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Create, CreateFile, FileDeleteWithPhoto, Gets, Update } from '@/lib/api'
import { toast } from 'react-toastify'
import appConfig from '@/config'

const SystemSettings = () => {
  const [formValues, setFormValues] = useState({})
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const newData = { ...data }
    if (newData.logo) {
      const file = {
        uid: Math.random() * 1000 + '',
        name: 'logo',
        status: 'done',
        url: `${appConfig.apiBaseUrl}/uploads/${data.logo || 'no-data.png'}`,
      }
      newData.fileList = [file]
    }
    setFormData(newData)
    return () => {
      setFormValues({})
      form.resetFields()
    }
  }, [data])

  useEffect(() => {
    ; (async () => {
      const params = { api: 'settings' }
      const res = await Promise.resolve(Gets(params))

      if (res?.data) {
        setData(res?.data[0])
        setFormData(res?.data[0])
      } else {
        setData({})
        setFormData({})
      }
    })()
  }, [])

  const handleSubmit = async (values) => {
    let newData = { ...values }
    if (newData.fileName) delete newData.fileName
    // return console.log('newData:', newData)

    setLoading({ save: true })
    setTimeout(async () => {
      const params = { api: 'settings', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      setLoading({ save: false })
      toast.success(`System ${newData?.id ? 'Updated' : 'Created'} Successfully`)
    }, 100)
  }

  const uploadButton = (
    <div>
      {loading.upload ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Upload</div>
    </div>
  )

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
          url: `${appConfig.apiBaseUrl}/uploads/${data.logo || 'no-data.png'}`,
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
    <section>
      <div className="col-span-12">
        <Divider orientation="left">
          <span className="font-bold text-red-500">System Settings</span>
        </Divider>
      </div>
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

        <div className="flex items-start justify-between gap-5">
          <div>
            <Form.Item className="mb-1" label="Logo" name="fileList" getValueFromEvent={normFile}>
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
          <div className="grid flex-grow grid-cols-12 gap-2">
            <div className="col-span-6 lg:col-span-3">
              <Form.Item
                name="companyName"
                label="Company Name"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'Company Name is required',
                  },
                ]}
              >
                <Input placeholder="Enter Company Name" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <Form.Item
                name="phone"
                label="Phone"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'Phone is required',
                  },
                ]}
              >
                <Input placeholder="Enter Phone" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <Form.Item
                name="supportPhone"
                label="Support Number"
                className="mb-1"
                rules={[
                  {
                    required: true,
                    message: 'Support Number is required',
                  },
                  {
                    pattern: /^(?:\+88|01)?(?:\d{11}|\d{13})$/i,
                    message: 'Wrong format!',
                  },
                ]}
              >
                <Input placeholder="Enter Support Number" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
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

            <div className="col-span-6 lg:col-span-3">
              <Form.Item name="facebookUrl" label="Facebook Link" className="mb-1">
                <Input placeholder="Enter Facebook Url" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <Form.Item name="youtubeUrl" label="Youtube Link" className="mb-1">
                <Input placeholder="Enter Youtube Url" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <Form.Item name="twitter" label="Twitter Link" className="mb-1">
                <Input placeholder="Enter Twitter Url" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <Form.Item name="instagram" label="Instagram Link" className="mb-1">
                <Input placeholder="Enter Instagram Url" />
              </Form.Item>
            </div>

            <div className="col-span-7">
              <Form.Item name="fullAddress"
                rules={[
                  {
                    required: true,
                    message: 'Full Address is required',
                  },
                ]}
                label="Full Address"
                className="mb-1"
              >
                <Input placeholder="Enter Full Address" />
              </Form.Item>
            </div>

            <div className="col-span-5 flex items-end justify-end">
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
    </section>
  )
}

export default SystemSettings
