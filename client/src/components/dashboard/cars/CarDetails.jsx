
import React from 'react'
import { Dialog, IconButton } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import { IoCloseOutline } from 'react-icons/io5'
import SingleCar from '../../products/SingleCar'

export default function CarDetails({ action = {}, setAction }) {
  const { payload: data } = action

  return (
    <Dialog
      open={ActionType.VIEW === action.type}
      handler={() => setAction({})}
      size='xl'
    >
      <section>
        <div className='p-2 flex justify-between items-center border-b'>
          <h1>Car Details</h1>
          <IconButton variant='text' color='red' onClick={() => setAction({})}>
            <IoCloseOutline size={25} />
          </IconButton>
        </div>
        <div className='h-[80vh] overflow-auto p-5'>
          <SingleCar data={data} />
        </div>
      </section>
    </Dialog>
  )
}

