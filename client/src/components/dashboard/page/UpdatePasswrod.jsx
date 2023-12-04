import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Create, Update } from '../../../lib/api'

const UpdatePassword = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { payload: data } = action
  const [form] = Form.useForm()

  // Mutation

  useEffect(() => {
    const newData = { ...data }
    setFormData(newData)
    return () => {
      setFormValues({})
      form.resetFields()
    }
  }, [data])

  const handleSubmit = async (values) => {
    let newData = { ...values }

    setLoading({ save: true })
    setTimeout(async () => {
      const params = { api: 'auth/update-password', data: newData }
      const result = await Update(params)
      if (result.errorName) return toast.error("Password must be at least 8 to 20 characters")
      setLoading({ save: false })
      toast.success(`User Password update Successfully`)
      setAction({})
    }, 100)
  }

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
      form.setFieldsValue(newData)
    }
    setFormValues(form.getFieldsValue())
  }


  return (
    <Modal
      title="Update Password"
      width={400}
      zIndex={1050}
      open={action.key === "UpdatePassword"}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        name='Updatepassword'
        onValuesChange={(_v, values) => setFormValues(values)}
        autoComplete="off"
        scrollToFirstError={true}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>


        <div>
          <Form.Item
            name="currentPassword"
            label="Current Passwrod"
            className="mb-1"
            rules={[
              {
                required: true,
                message: 'Current Passwrod is required',
              },
            ]}
          >
            <Input.Password placeholder="Enter Current Passwrod" />
          </Form.Item>



          <Form.Item
            name="newPassword"
            label="New Passwrod"
            className="mb-1"

            rules={[
              {
                required: true,
                message: 'New Passwrod is required',
              }
            ]}
          >
            <Input.Password placeholder="Enter New Passwrod" />
          </Form.Item>
        </div>


        <div className="col-span-2 mt-3 text-end">
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
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdatePassword
