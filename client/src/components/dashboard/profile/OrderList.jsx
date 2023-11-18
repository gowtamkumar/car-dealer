/* eslint-disable @next/next/no-img-element */
'use client'
import { BsHandbag } from 'react-icons/bs'
import { Typography, Chip, IconButton } from '@material-tailwind/react'
import { AiOutlineEye } from 'react-icons/ai'

const OrderList = ({ theme, orders }) => {
  const TABLE_HEAD = ['Order #', 'Date purchased', 'Total', 'Status', '']

  return (
    <div>
      <Typography variant="h6" color="blue-gray" className="m-0 font-bold">
        <BsHandbag className={`me-3 inline-block text-xl text-${theme || 'blue-gray-500'}`} />
        <span>My Orders</span>
      </Typography>
      {orders.length > 0 ? (
        <table className="my-3 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-1 border-blue-gray-100 bg-blue-gray-50/50 p-3">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="m-0 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              const key = index + 1

              return (
                <tr className="border-b hover:bg-blue-gray-50" key={key}>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      {item.code}
                    </Typography>
                  </td>

                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      {item.date}
                    </Typography>
                  </td>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      ৳ {(item.amount || 0).toFixed(2)}
                    </Typography>
                  </td>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={item.status}
                        className="capitalize"
                        color={
                          item.status === 'paid'
                            ? 'green'
                            : item.status === 'pending'
                            ? 'amber'
                            : 'red'
                        }
                      />
                    </div>
                  </td>
                  <td className="my-2 w-20 rounded-sm p-2 text-center shadow-sm">
                    <IconButton color={theme} size="sm" variant="text">
                      <AiOutlineEye className="text-lg" />
                    </IconButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className="col-span-full flex h-64 flex-row items-center justify-center">
          <div className="text-center">
            <img
              src="/assets/svgs/empty-folder.svg"
              className="h-36 w-36 object-fill"
              alt="empty"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderList
