import React, { useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import config from 'src/config'
import { ActionType } from '../../../lib/constants'
import { Button } from '@material-tailwind/react'

const AddModel = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { payload: data } = action
  const [form] = Form.useForm()

  // Mutation

  const handleSubmit = async (values) => {
    let newData = { ...values }
    return console.log('newData:', newData)

    // setLoading({ save: true })
    // setTimeout(async () => {
    //   const result = newData.id ? await updateBrand(newData) : await createBrand(newData)
    //   setLoading({ save: false })
    //   if (result.error) return errorMsg('Error')
    //   successMsg(`Brand ${newData.id ? 'Updated' : 'Created'} Successfully`)
    //   setAction({})
    // }, 100)
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

  useEffect(() => {
    const newData = { ...data }
    setFormData(newData)
    return () => {
      setFormValues({})
      form.resetFields()
    }
  }, [data])

  const setFormData = (v) => {
    const newData = { ...v }
    form.setFieldsValue(newData)
    setFormValues(form.getFieldsValue())
  }

  const resetFormData = () => {
    form.resetFields()
    if (data.id) {
      const newData = { ...data }
      if (data.photo) {
        const file = {
          uid: Math.random() * 1000 + '',
          name: 'photo',
          status: 'done',
          url: `${config.apiBaseUrl}/uploads/${data.photo}`,
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

    // try {
    //   const res = await createFile(fmData).unwrap()
    //   if (res.photo.length) {
    //     setFormData({ logo: res.photo[0]?.filename })
    //   }
    //   onSuccess('Ok')
    // } catch (err) {
    //   const error = new Error('Upload error')
    //   onError({ err })
    // }
  }

  const normFile = ({ file, fileList }) => {
    if (file.status === 'removed') {
      setFormData({ photo: null })
    }
    return fileList
  }

  return (
    <Modal
      title={action.type === ActionType.UPDATE ? 'Update Model' : 'Create Model'}
      width={window.innerWidth > 900 ? 600 : window.innerWidth - 50}
      zIndex={1050}
      open={action.type === ActionType.CREATE || action.type === ActionType.UPDATE}
      onCancel={handleClose}
      footer={
        <>
          <Button variant="text" className="mx-2 capitalize" size="sm" onClick={resetFormData}>
            Reset
          </Button>
          <Button
            onClick={() => form.submit()}
            size="sm"
            variant="gradient"
            color="blue"
            className="capitalize"
            loading={loading.submit}
          >
            {formValues.id ? 'Update' : 'Submit'}
          </Button>
        </>
      }
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

        <div className="grid grid-cols-1 gap-5">
          <div className="col-span-1 text-center">
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

            <Form.Item noStyle name="logo" hidden>
              <Input />
            </Form.Item>
          </div>

          <div className="col-span-1">
            <Form.Item
              name="name"
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

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter Brand Description" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default AddModel
