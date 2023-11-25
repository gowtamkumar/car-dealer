import React, { useEffect, useState } from 'react'
import { Gets } from '../../../lib/api'
import appConfig from '../../../config'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'

const BannerList = ({ filter, setAction }) => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    ; (async () => {
      const params = { api: 'banners' }
      const res = await Promise.resolve(Gets(params))

      if (filter) {
        const newData = res?.data.filter((item) => item.status === filter)
        setBanners(newData)
      } else {
        setBanners((res?.data || []).map((item) => ({ ...item, img: item.photo })))
      }
    })()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
      {(banners || []).map((item, idx) => (
        <div
          key={idx}
          className="group/item relative col-span-1 h-full w-full overflow-hidden rounded-md border"
        >
          <img
            src={`${appConfig.apiBaseUrl}/uploads/${item.img || ''} `}
            alt={`Banner ${idx}`}
            className="h-[20vh] w-full object-cover  lg:h-[40vh]"
          />
          <div
            className={`invisible absolute inset-0 grid h-full w-full place-items-center bg-black/40 transition-all duration-300 ease-in-out group-hover/item:visible`}
          >
            <div>
              <Button color="red">Delete</Button>
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
      ))}
    </div>
  )
}

export default BannerList
