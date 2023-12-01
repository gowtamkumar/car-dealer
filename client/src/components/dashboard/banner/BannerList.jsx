import React from 'react'
import { Delete } from '../../../lib/api'
import appConfig from '../../../config'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import { toast } from 'react-toastify'
import { FaCar } from 'react-icons/fa6'
import { Empty } from 'antd';



const BannerList = ({ banners, setAction }) => {
  const handleDelete = async (id) => {
    setTimeout(async () => {
      const params = { api: 'banners', id }
      const result = await Delete(params)
      if (result.error) toast.error(result.error.data.message)
      toast.success('Banner deleted successfully')
    }, 300)
  }

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
      {banners.length ?
        (banners || []).map((item, idx) => {
          return (
            <div
              key={idx}
              className="group/item relative col-span-1 h-full w-full overflow-hidden rounded-md border"
            >
              <img
                src={`${appConfig.apiBaseUrl}/uploads/${item.photo || ''} `}
                alt={`Banner ${idx}`}
                className="h-[20vh] w-full object-cover  lg:h-[40vh]"
              />
              <div
                className={`invisible absolute inset-0 grid h-full w-full place-items-center bg-black/40 transition-all duration-300 ease-in-out group-hover/item:visible`}
              >
                <div>
                  <Button onClick={() => handleDelete(item.id)} color="red">
                    Delete
                  </Button>
                  <Button
                    onClick={() => setAction({ type: ActionType.UPDATE, payload: item })}
                    color="blue"
                    className="mx-2"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )
        }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
  )
}

export default BannerList
