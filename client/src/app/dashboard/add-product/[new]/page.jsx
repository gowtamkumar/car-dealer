'use client'
import { DatePicker, Divider, Form, Input, InputNumber, Select, Upload, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import productEnum from '../../../../lib/utils'
import { Button } from '@material-tailwind/react'
import { PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import getModels from '../../../../lib/getModel'
import getModelCode from '../../../../lib/getModelCode'
import createFile from '../../../../lib/createFile'
import { getBrands } from '../../../../lib/brand'
import { Gets } from '../../../../lib/api'

const AddProduct = () => {
  const [formValues, setFormValues] = useState({})
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [modelCodes, setModelCodes] = useState([])

  // hook
  const [form] = Form.useForm()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const newsss = await getSession()
      // const brands = await getBrands(newsss.user?.token)
      const brands = await Gets('brands')
      const models = await getModels(newsss.user?.token)
      const modelCodes = await getModelCode(newsss.user?.token)
      setModelCodes(modelCodes.data)
      setModels(models.data)
      setBrands(brands.data)
    })()
  }, [])

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

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

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

  const handleSubmit = async (values) => {
    const newData = { ...values }

    return console.log('Submit', newData)
    // setLoading({ save: true })
    // setTimeout(async () => {
    //   const result = newData.id ? await updateProduct(newData) : await createProduct(newData)
    //   setLoading({ save: false })
    //   if (result.error) return errorMsg('Error')
    //   successMsg(`Product ${newData.id ? 'Updated' : 'Created'} Successfully`)
    //   setAction({})
    // }, 100)
  }

  const setFormData = (v) => {
    const newData = { ...v }
    form.setFieldsValue(newData)
    setFormValues(form.getFieldsValue())
  }

  const resetFormData = () => {
    form.resetFields()
    // const { batchNo, expiryDate, ...newData } = { ...action.payload }

    // if (newData.id) {
    //   if (expiryDate) {
    //     newData.expiryDate = moment(expiryDate)
    //     newData.isExpiryDate = true
    //   }

    //   if (batchNo) newData.isBatchNo = true
    //   if (newData.photo) {
    //     const file = {
    //       uid: Math.random() * 1000 + '',
    //       name: 'Photo',
    //       status: 'done',
    //       url: `${config.apiBaseUrl}/uploads/${newData.photo}`,
    //     }
    //     newData.fileList = [file]
    //   }
    //   form.setFieldsValue(newData)
    // }
    // setFormValues(form.getFieldsValue())
  }

  const customUploadRequest = async (options) => {
    const { filename, file, onSuccess, onError } = options
    const fmData = new FormData()
    fmData.append(filename, file)
    // return
    try {
      const res = await createFile(fmData)
      if (res.images?.length) {
        setFormData({ photos: [...form.getFieldValue().photos, res?.images[0]?.filename] })
      }
      onSuccess('Ok')
    } catch (err) {
      console.log('err', err)
      const error = new Error('Upload error')
      onError({ err })
    }
  }

  const normFile = (e) => {
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
      onValuesChange={(_v, values) => setFormValues(values)}
      autoComplete="off"
      scrollToFirstError={true}
      initialValues={{
        status: 'Active',
      }}
    >
      <Form.Item name="id" hidden>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="brandId">
            Brand <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="brandId"
            rules={[
              {
                required: false, // true
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
              {brands.map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
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
                required: false, // true
                message: 'Model is required',
              },
            ]}
          >
            <Select
              id="modelId"
              showSearch
              allowClear
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {models.map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
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
                required: false, // true
                message: 'Model Code is required',
              },
            ]}
          >
            <Select
              id="modelCodeId"
              showSearch
              allowClear
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {modelCodes.map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            <InputNumber id="noOfPass" placeholder="Enter Passenser" className="w-full" />
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
            <InputNumber id="noOfseat" placeholder="Enter No Of seat" className="w-full" />
          </Form.Item>
        </div>

        <div className="col-span-12 lg:col-span-3">
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

        <div className="col-span-12 lg:col-span-3">
          <label className="mb-1" htmlFor="productFeature">
            Product Features <span className="text-red-500">*</span>
          </label>
          <Form.Item
            className="mb-1"
            name="productFeature"
            rules={[
              {
                required: true,
                message: 'Product Feature is required',
              },
            ]}
          >
            <Select
              id="productFeature"
              showSearch
              allowClear
              placeholder="Select Product Feature"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
      </div>

      <div className="grid grid-cols-12 gap-3 px-3 lg:px-0">
        <div className="col-span-12 lg:col-span-6 ">
          <Divider className="m-0 p-0" orientation="left">
            <code>
              <span className="text-lg font-semibold text-red-400">2. </span>Additional Information
            </code>
          </Divider>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 lg:col-span-1">
              <label className="mb-1" htmlFor="divisionId">
                Division <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="divisionId"
                rules={[
                  {
                    required: false, // true
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[].map((item, idx) => (
                    <Select.Option key={idx} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label className="mb-1" htmlFor="districtId">
                District <span className="text-red-500">*</span>
              </label>
              <Form.Item
                className="mb-1"
                name="districtId"
                rules={[
                  {
                    required: false, // true
                    message: 'District is required',
                  },
                ]}
              >
                <Select
                  id="districtId"
                  showSearch
                  allowClear
                  placeholder="Select District"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[].map((item, idx) => (
                    <Select.Option key={idx} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-span-2 lg:col-span-1">
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

            <div className="col-span-2 lg:col-span-1">
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

            <div className="col-span-2">
              <label className="mb-1" htmlFor="description">
                Description
              </label>
              <Form.Item className="mb-1" name="description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 ">
          <Divider className="m-0 p-0" orientation="left">
            <code>
              <span className="text-lg font-semibold text-red-400">3.</span> Product Images
            </code>
          </Divider>

          <div className="grid grid-cols-1 gap-3 px-3">
            <Form.Item name="fileList" label="Photos" getValueFromEvent={normFile}>
              <Upload
                name="images"
                listType="picture-card"
                fileList={formValues?.fileList || []}
                className="avatar-uploader"
                onPreview={handlePreview}
                customRequest={customUploadRequest}
                maxCount={5}
              >
                {formValues?.fileList?.length >= 5 ? null : uploadButton}
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
          </div>
        </div>

        <div className="col-span-12">
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-red-500">
              (<span className="text-xl"> * </span> অবশ্যই পূরণ করতে হবে)
            </div>
            <div className="my-2">
              {/* <Button onClick={() => router.back()} variant="outlined" color="gray">
                {'<<'} Back
              </Button> */}
              <Button className="mx-2" onClick={resetFormData} variant="gradient" color="gray">
                Reset
              </Button>
              <Button type="submit" variant="gradient" color="blue">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default AddProduct
