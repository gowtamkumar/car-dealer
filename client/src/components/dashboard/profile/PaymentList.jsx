/* eslint-disable @next/next/no-img-element */
import { Button, Chip, IconButton, Typography } from '@material-tailwind/react'
import { AiOutlineCreditCard, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const PaymentList = ({ theme, paymentMethods }) => {
  const TABLE_HEAD = ['Name', 'Card Number', 'Card Date', 'Status', '']

  return (
    <div>
      <div className="flex justify-between border-b py-3">
        <Typography variant="h6" color="blue-gray" className="m-0 flex flex-row items-center gap-3">
          <AiOutlineCreditCard className="text-xl" />
          <span>Payment Methods</span>
        </Typography>
        <Button variant="outlined" size="sm" color={theme} className="capitalize">
          Add New Payment Methods
        </Button>
      </div>
      {paymentMethods.length > 0 ? (
        <table className="mb-10 mt-3 w-full min-w-max table-auto text-left">
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
            {paymentMethods.map((item, index) => {
              const key = index + 1

              return (
                <tr className="border-b hover:bg-blue-gray-50" key={key}>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      {item.name}
                    </Typography>
                  </td>

                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      {item.cardNumber}
                    </Typography>
                  </td>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <Typography variant="small" color="blue-gray" className="m-0 font-normal">
                      {item.cardDate}
                    </Typography>
                  </td>
                  <td className="my-2 rounded-sm p-2 shadow-sm">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={item.isActive ? 'Active' : 'Inactive'}
                        className="capitalize"
                        color={item.isActive ? 'green' : 'red'}
                      />
                    </div>
                  </td>

                  <td className="my-2 w-20 rounded-sm p-2 text-center shadow-sm">
                    <IconButton color={theme} size="sm" variant="text">
                      <AiOutlineEdit className="text-lg" />
                    </IconButton>
                    <IconButton color="red" size="sm" variant="text">
                      <AiOutlineDelete className="text-lg" />
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

export default PaymentList
