import React from 'react'
import { Dialog, Button, IconButton } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import { IoCloseOutline } from 'react-icons/io5'
import { Update } from '../../../lib/api'
import { toast } from 'react-toastify'

export default function CarStatus({ action = {}, setAction }) {
  const { payload: data } = action

  const handleClick = (type) => {
    const newData = { ...data }
    newData.status = type
    setTimeout(async () => {
      const params = { api: 'products', data: newData }
      const result = newData.id ? await Update(params) : await Create(params)
      if (result.errorName) return toast.error(result.message)
      toast.success(`Car Updated Successfully`)
      setAction({})
    }, 100)
  }

  return (
    <Dialog open={ActionType.APPROVE === action.type} handler={() => setAction({})}>
      <section>
        <div className="flex items-center justify-between border-b p-2">
          <h1>Car Status</h1>
          <IconButton variant="text" color="red" onClick={() => setAction({})}>
            <IoCloseOutline size={25} />
          </IconButton>
        </div>
        <div className="rounded-lg border p-3">
          <div className="grid grid-cols-2 gap-5">
            <Button
              onClick={() => handleClick('Approved')}
              variant="gradient"
              fullWidth
              className={`${data?.status === 'Approved' ? 'hidden' : 'block'}`}
              color="green"
            >
              Approved
            </Button>
            <Button
              onClick={() => handleClick('Rejected')}
              variant="gradient"
              fullWidth
              className={`${data?.status === 'Rejected' ? 'hidden' : 'block'}`}
              color="red"
            >
              Rejected
            </Button>
            <Button
              onClick={() => handleClick('Pending')}
              variant="gradient"
              fullWidth
              className={`${data?.status === 'Pending' ? 'hidden' : 'block'}`}
              color="orange"
            >
              Pending
            </Button>
          </div>
        </div>
      </section>
    </Dialog>
  )
}
