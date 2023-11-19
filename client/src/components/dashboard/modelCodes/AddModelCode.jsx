import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { ActionType } from '../../../lib/constants'
import { Button } from '@material-tailwind/react'
import { Create, Gets, Update } from '../../../lib/api'
import appConfig from '../../../config'
import { toast } from 'react-toastify'

const AddModelCode = ({ action = {}, setAction }) => {
  const [formValues, setFormValues] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiData, setApiData] = useState({})
  const { payload: data } = action
  const [form] = Form.useForm()

  // Mutation

  const handleSubmit = async (values) => {
    let newData = { ...values }
    // return console.log('newData:', newData)
    setLoading({ save: true })
    setTimeout(async () => {
      const params = { api: 'model-codes', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.error) return toast.error(`Error`)
      setLoading({ save: false })
      toast.success(`Model Code ${newData?.id ? 'Updated' : 'Created'} Successfully`)
      setAction({})
    }, 100)
  }

  const handleClose = () => {
    setAction({})
    setLoading({})
  }

  useEffect(() => {
    const newData = { ...data }
    ;(async () => {
      const models = await Gets({ api: 'models' })
      setApiData({
        ...apiData,
        models: models.data,
      })
    })()
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
      form.setFieldsValue(newData)
    }
    setFormValues(form.getFieldsValue())
  }

  return (
    <Modal
      title={action.type === ActionType.UPDATE ? 'Update Model' : 'Create Model'}
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
        <Form.Item noStyle className="mb-1" name="id" hidden>
          <Input />
        </Form.Item>

        <div className="my-3 grid grid-cols-1 gap-5">
          <div className="col-span-1">
            <Form.Item
              className="mb-1"
              name="modelId"
              label="Model"
              rules={[
                {
                  required: true,
                  message: 'Model is required',
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Select Model"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {(apiData.models || []).map((item, idx) => (
                  <Select.Option key={idx} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-span-1">
            <Form.Item
              className="mb-1"
              name="name"
              label="Model Name"
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                },
              ]}
            >
              <Input placeholder="Enter Model Name" />
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
      </Form>
    </Modal>
  )
}

export default AddModelCode
