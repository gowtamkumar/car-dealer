import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { ActionType } from '../../../constants/constants'
import { Button } from '@material-tailwind/react'
import { Create, Gets, Update } from '../../../lib/api'
import appConfig from '../../../config'
import { toast } from 'react-toastify'

const AddModel = ({ action = {}, setAction }) => {
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
      const params = { api: 'models', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.error) return toast.error(`Error`)
      setLoading({ save: false })
      toast.success(`Model ${newData?.id ? 'Updated' : 'Created'} Successfully`)
      setAction({})
    }, 100)
  }

  const handleClose = () => {
    setAction({})
    setLoading({})
  }

  useEffect(() => {
    const newData = { ...data }
      ; (async () => {
        const brands = await Gets({ api: 'brands' })
        setApiData({
          ...apiData,
          brands: brands.data,
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
              name="brandId"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: 'Brand is required',
                },
              ]}
            >
              <Select
                id="brandId"
                showSearch
                allowClear
                placeholder="Select Brand"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {(apiData.brands || []).map((item, idx) => (
                  <Select.Option key={idx} value={item.id}>
                    <div className="flex items-center gap-2">
                      <img
                        className="h-5 w-5"
                        src={`${appConfig.apiBaseUrl}/uploads/${item.logo}`}
                        alt=""
                      />{' '}
                      <span>{item.name}</span>
                    </div>
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
      </Form>
    </Modal>
  )
}

export default AddModel
