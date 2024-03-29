'use client'
import React, { useEffect, useState } from 'react'
import appConfig from '../../../../config'
import productEnum from '../../../../constants/utils'
import dayjs from 'dayjs'
import { Button } from '@material-tailwind/react'
import { PlusOutlined } from '@ant-design/icons'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Create, Get, Gets, Update, CreateFile, FileDeleteWithPhoto } from '../../../../lib/api'
import { useRouter } from 'next/navigation'
import { DatePicker, Divider, Form, Input, InputNumber, Select, Upload, Modal } from 'antd'

const AddProduct = ({ params }) => {
  const [formValues, setFormValues] = useState({ fileList: [], photos: [] })
  const [backUp, setBackup] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [apiData, setApiData] = useState({})

  // hook
  const [form] = Form.useForm()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    ; (async () => {
      if (params.new === 'new') {
        form.resetFields()
        setFormValues({})
        return
      }
      const param = { api: 'products', id: params.new }
      const result = await Promise.resolve(Get(param))

      const newData = { ...result.data }
      // console.log("🚀 ~ newData:", newData)

      if (newData.photos) {
        const file = (newData.photos || []).map((item, idx) => ({
          uid: Math.random() * 1000 + '',
          name: `photo ${Math.random() * 1000 + ''}`,
          status: 'done',
          fileName: item,
          url: `${appConfig.apiBaseUrl}/uploads/${item || 'no-data.png'}`,
        }))
        newData.fileList = file
      }
      setFormData(newData)
      // setFormValues(newData)
      if (result.errorName) {
        toast.error(`Car Id Not Valid`)
        return router.push('/dashboard/cars-list')
      }
    })()
  }, [params.new])

  useEffect(() => {
    ; (async () => {
      const brands = await Promise.resolve(Gets({ api: 'brands' }))
      const models = await Promise.resolve(Gets({ api: 'models' }))
      const modelCodes = await Promise.resolve(Gets({ api: 'model-codes' }))
      const divisions = await Promise.resolve(Gets({ api: 'divisions' }))
      const districts = await Promise.resolve(Gets({ api: 'districts' }))
      const upazilas = await Promise.resolve(Gets({ api: 'upazilas' }))
      setApiData({
        ...apiData,
        models: models?.data,
        modelCodes: modelCodes?.data,
        brands: brands?.data,
        divisions: divisions?.data,
        districts: districts?.data,
        upazilas: upazilas?.data,
      })
    })()
  }, [])

  console.log("formValues", formValues);

  const num = session.data?.user?.role === 'Seller' ? 3 : 5

  const handleSubmit = async (values) => {
    const newData = { ...values }
    if (session.data?.user?.role === 'Seller') newData.condition = 'Used'

    // return console.log('Submit', newData)
    setTimeout(async () => {
      const params = { api: 'products', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      toast.success(`Car ${newData.id ? 'Updated' : 'Created'} Successfully`)
      // router.push('/dashboard/cars-list')
      setFormValues({})
      form.resetFields()
    }, 100)
  }

  const handleCancel = () => setPreviewOpen(false)

  // file Preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const setFormData = (v) => {
    const newData = { ...v }
    if (newData.manufactureDate) newData.manufactureDate = dayjs(newData.manufactureDate)
    if (newData.registrationDate) newData.registrationDate = dayjs(newData.registrationDate)
    form.setFieldsValue(newData)

    setFormValues(form.getFieldsValue())
    setBackup(newData)
  }

  const resetFormData = () => {
    form.resetFields()
    if (backUp?.id) {
      const newData = { ...backUp }
      if (newData.photos) {
        const file = (newData.photos || []).map((item, idx) => ({
          uid: Math.random() * 1000 + '',
          name: `photo ${idx}`,
          status: 'done',
          fileName: item,
          url: `${appConfig.apiBaseUrl}/uploads/${item || 'no-data.png'}`,
        }))
        newData.fileList = file
      }
      form.setFieldsValue(newData)
    }
  }

  const customUploadRequest = async (options) => {
    const { filename, file, onSuccess, onError } = options
    const fmData = new FormData()
    fmData.append(filename, file)
    // return
    try {
      const res = await CreateFile(fmData)
      console.log("🚀 ~ res:", res)

      const newfile = (res.images || []).map((item, idx) => ({
        uid: Math.random() * 1000 + '',
        name: `photo ${Math.random() * 10000 + ''}`,
        status: 'done',
        fileName: item.filename,
        url: `${appConfig.apiBaseUrl}/uploads/${item.filename || 'no-data.png'}`,
      }))

      const newFileName = res?.images?.length ? res?.images[0]?.filename : null

      setFormData({
        fileList: [...form.getFieldValue()?.fileList, ...newfile],
        photos: [...form.getFieldValue()?.photos, newFileName],
      })
      // if (res.images?.length) {
      //   setFormData({
      //     fileList: [...form.getFieldValue()?.fileList, ...file],
      //     photos: [...form.getFieldValue()?.photos, ...res?.images[0]?.filename],
      //   })
      // }

      onSuccess('Ok')
    } catch (err) {
      console.log('err', err)
      const error = new Error('Upload error')
      onError({ err })
    }
  }

  const normFile = (e) => {
    console.log('🚀 ~ e:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      onValuesChange={(_v, values) => {
        const newData = { ...values }
        if (newData.brandId !== formValues.brandId) newData.modelId = null
        if (newData.modelId !== formValues.modelId) newData.modelCodeId = null
        if (newData.divisionId !== formValues.divisionId) newData.districtId = null
        if (newData.districtId !== formValues.districtId) newData.upazilaId = null
        setFormData(newData)
      }}
      autoComplete="off"
      scrollToFirstError={true}
      initialValues={{
        status: 'Active',
        photos: [],
        fileList: [],
      }}
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item name="fileList" hidden>
        <Input />
      </Form.Item>

      <div className="grid grid-cols-12 gap-3 px-3 lg:px-0">
        <div className="col-span-12 p-0">
          <Divider className="m-0 p-0" orientation="left">
            <code>
              <span className="text-lg font-semibold text-red-400">1.</span> Car Informations
            </code>
          </Divider>
        </div>

        {session.data?.user?.role !== 'Seller' && (
          <div className="col-span-12 lg:col-span-3">
            <label className="mb-1" htmlFor="condition">
              Condition <span className="text-red-500">*</span>
            </label>
            <Form.Item
              className="mb-1"
              name="condition"
              rules={[
                {
                  required: true,
                  message: 'Condition is required',
                },
              ]}
            >
              <Select
                id="condition"
                showSearch
                allowClear
                placeholder="Select Condition"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {productEnum.condition.map((item, idx) => (
                  <Select.Option key={idx} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        )}

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="brandId">
            Brand <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="brandId"
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
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="modelId">
            Model <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="modelId"
            rules={[
              {
                required: true,
                message: 'Model is required',
              },
            ]}
          >
            <Select
              id="modelId"
              showSearch
              allowClear
              disabled={!formValues?.brandId}
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {(apiData.models || [])
                .filter((item) => item.brandId === formValues.brandId)
                .map((item, idx) => {
                  return (
                    <Select.Option key={idx} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="modelCodeId">
            Model Code <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="modelCodeId"
            rules={[
              {
                required: true,
                message: 'Model Code is required',
              },
            ]}
          >
            <Select
              id="modelCodeId"
              showSearch
              allowClear
              disabled={!formValues?.modelId}
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {(apiData.modelCodes || [])
                .filter((item) => item.modelId === formValues.modelId)
                .map((item, idx) => (
                  <Select.Option key={idx} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'name is required',
              },
            ]}
            className="mb-1"
            name="name"
          >
            <Input id="name" placeholder="Enter Name" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="edition">
            Edition
          </label>
          <Form.Item className="mb-1" name="edition">
            <Input id="edition" placeholder="Enter Edition" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="manufactureDate">
            Manufacture Year
          </label>
          <Form.Item className="mb-1" name="manufactureDate">
            <DatePicker
              picker="year"
              id="manufactureDate"
              className="w-full"
              placeholder="Select Manufacture Year"
            />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="registrationDate">
            Registration Year
          </label>
          <Form.Item className="mb-1" name="registrationDate">
            <DatePicker
              picker="year"
              className="w-full"
              id="registrationDate"
              placeholder="Select Registration Year"
            />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="fuelType">
            Fuel Type <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="fuelType"
            rules={[
              {
                required: true,
                message: 'Fuel Type is required',
              },
            ]}
          >
            <Select
              id="fuelType"
              showSearch
              allowClear
              placeholder="Select Fuel Type"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.fuelType.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="transmission">
            Transmission <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="transmission"
            rules={[
              {
                required: true,
                message: 'Transmission is required',
              },
            ]}
          >
            <Select
              id="transmission"
              showSearch
              allowClear
              placeholder="Select Transmission"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.transmission.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="steering">
            Steering <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="steering"
            rules={[
              {
                required: true,
                message: 'Steering is required',
              },
            ]}
          >
            <Select
              id="steering"
              showSearch
              allowClear
              placeholder="Select Steering"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.steering.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="noOfPass">
            No Of Pass. <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="noOfPass"
            rules={[
              {
                required: true,
                message: 'No Of Pass. is required',
              },
            ]}
          >
            <Select
              id="noOfPass"
              showSearch
              allowClear
              placeholder="Select Passenser"
              optionFilterProp="children"
            >
              {productEnum.numberOfSeat.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="milleage">
            Milleage <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="milleage"
            rules={[
              {
                required: true,
                message: 'Milleage is required',
              },
            ]}
          >
            <InputNumber id="milleage" placeholder="Enter Milleage" className="w-full" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="loadCapacity">
            Load Capacity
          </label>
          <Form.Item className="mb-1" name="loadCapacity">
            <Input id="loadCapacity" placeholder="Enter Load Capacity" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="engCc">
            Eng Cc
          </label>
          <Form.Item className="mb-1" name="engCc">
            <Input id="engCc" placeholder="Enter Eng Cc" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="engCode">
            Eng Code
          </label>
          <Form.Item className="mb-1" name="engCode">
            <Input id="engCode" placeholder="Enter Eng Code" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="noOfseat">
            No Of seat <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="noOfseat"
            rules={[
              {
                required: true,
                message: 'No Of seat is required',
              },
            ]}
          >
            {/* <InputNumber id="noOfseat" placeholder="Enter No Of seat" className="w-full" /> */}
            <Select
              id="noOfseat"
              showSearch
              allowClear
              placeholder="Select Seat"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.numberOfSeat.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="drivetrain">
            Drivetrain <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="drivetrain"
            rules={[
              {
                required: true,
                message: 'Drivetrain is required',
              },
            ]}
          >
            <Select
              id="drivetrain"
              showSearch
              allowClear
              placeholder="Select Drivetrain"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.drivetrain.map((item, idx) => (
                <Select.Option key={idx} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <label className="mb-1" htmlFor="productFeature">
            Car Features <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="productFeature"
            rules={[
              {
                required: true,
                message: 'Car Feature is required',
              },
            ]}
          >
            <Select
              id="productFeature"
              showSearch
              allowClear
              mode="multiple"
              placeholder="Select Car Feature"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productEnum.features.map((item, idx) => (
                <Select.Option key={idx} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 px-3 lg:px-0">
        <div className="col-span-12 lg:col-span-6 ">
          <Divider className="m-0 p-0" orientation="left">
            <code>
              <span className="text-lg font-semibold text-red-400">2. </span>Additional Information
            </code>
          </Divider>

          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 lg:col-span-2">
              <label className="mb-1" htmlFor="divisionId">
                Division <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="divisionId"
                rules={[
                  {
                    required: true,
                    message: 'Division is required',
                  },
                ]}
              >
                <Select
                  id="divisionId"
                  showSearch
                  allowClear
                  placeholder="Select Division"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {(apiData.divisions || []).map((item, idx) => (
                    <Select.Option key={idx} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-2">
              <label className="mb-1" htmlFor="districtId">
                District <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="districtId"
                rules={[
                  {
                    required: true,
                    message: 'District is required',
                  },
                ]}
              >
                <Select
                  id="districtId"
                  showSearch
                  allowClear
                  disabled={!formValues?.divisionId}
                  placeholder="Select District"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {(apiData.districts || [])
                    .filter((item) => item.divisionId === formValues.divisionId)
                    .map((item, idx) => (
                      <Select.Option key={idx} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-2">
              <label className="mb-1" htmlFor="districtId">
                Upazila <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="upazilaId"
                rules={[
                  {
                    required: false,
                    message: 'District is required',
                  },
                ]}
              >
                <Select
                  id="upazilaId"
                  showSearch
                  allowClear
                  disabled={!formValues?.districtId}
                  placeholder="Select Upazila"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {(apiData.upazilas || [])
                    .filter((item) => item.districtId === formValues.districtId)
                    .map((item, idx) => (
                      <Select.Option key={idx} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label className="mb-1" htmlFor="bodyType">
                Body Type <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="bodyType"
                rules={[
                  {
                    required: true,
                    message: 'Body Type is required',
                  },
                ]}
              >
                <Select
                  id="bodyType"
                  showSearch
                  allowClear
                  placeholder="Select Body Type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {productEnum.bodyType.map((item, idx) => (
                    <Select.Option key={idx} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label className="mb-1" htmlFor="color">
                Color <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="color"
                rules={[
                  {
                    required: true,
                    message: 'Color is required',
                  },
                ]}
              >
                <Select
                  id="color"
                  showSearch
                  allowClear
                  placeholder="Select Color"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {productEnum.color.map((item, idx) => (
                    <Select.Option key={idx} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label className="mb-1" htmlFor="price">
                Price <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Price is required',
                  },
                ]}
              >
                <InputNumber id="price" placeholder="Enter Amount" className="w-full" />
              </Form.Item>
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label className="mb-1" htmlFor="noOfOwner">
                No Of Owner <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="noOfOwner"
                rules={[
                  {
                    required: true,
                    message: 'No Of Owner is required',
                  },
                ]}
              >
                <InputNumber id="noOfOwner" placeholder="Enter No Of Owner" className="w-full" />
              </Form.Item>
            </div>

            <div className="col-span-6">
              <label className="mb-1" htmlFor="description">
                Description
              </label>
              <Form.Item className="mb-1" name="description">
                <Input.TextArea rows={3} placeholder="Description" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 ">
          <Divider className="m-0 p-0" orientation="left">
            <code>
              <span className="text-lg font-semibold text-red-400">4.</span> Product Images
            </code>
          </Divider>

          <div className="grid grid-cols-1 gap-3 px-3">
            <Form.Item
              // name="fileList"
              label="Photos"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: 'Photos is required',
                },
              ]}
              getValueFromEvent={normFile}
            >
              <Upload
                name="images"
                listType="picture-card"
                fileList={formValues?.fileList || []}
                onRemove={async (v) => {
                  console.log('🚀 ~ v:', v)

                  const find = (form.getFieldValue('photos') || []).filter(
                    (item) => item !== v.fileName,
                  )
                  const newfind = (form.getFieldValue('fileList') || []).filter(
                    (item) => item.fileName !== v.fileName,
                  )
                  setFormData({ photos: find, fileList: newfind })

                  if (v.fileName) {
                    const params = { api: 'file-delete', data: { photo: v.fileName } }
                    await FileDeleteWithPhoto(params)
                  }
                }}
                className="avatar-uploader"
                onPreview={handlePreview}
                customRequest={customUploadRequest}
                maxCount={5}
              >
                {formValues?.fileList?.length >= num ? null : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item name="photos" hidden>
              <Input />
            </Form.Item>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>

            <div className="flex flex-col items-center lg:items-end">
              <div className="text-red-500">
                (<span className="text-xl"> * </span> Required)
              </div>
              <div className="my-2">
                <Button className="mx-2" onClick={resetFormData} variant="gradient" color="gray">
                  Reset
                </Button>
                <Button type="submit" variant="gradient" color="blue">
                  {formValues.id ? 'Update' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddProduct
