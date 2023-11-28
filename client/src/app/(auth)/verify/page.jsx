'use client'
import { Card, Input, Button, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Verify() {
  const [data, setData] = useState({})
  const [disable, setDisable] = useState(true)
  const [time, setTime] = useState(60)
  const router = useRouter()

  const locData = localStorage?.getItem('fromData')
  const newData = JSON.parse(locData)

  useEffect(() => {
    let interval = setInterval(() => {
      setTime((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      })
    }, 1000);

    if (time === 0) {
      newData.otp = null
      localStorage?.setItem('fromData', JSON.stringify(newData))
    }
    return () => {
      clearInterval(interval)
    }
  }, [disable])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { checkOtp } = data
      if (+checkOtp === +newData.otp) {
        router.push('/reset-password')
      } else {
        return toast.error("This verification is not valid")
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-5">
        <div className="flex min-h-[70vh] items-center justify-center">
          <Card className="w-full max-w-[24rem]">
            <CardHeader
              color="white"
              floated={true}
              shadow={true}
              className="m-0 grid place-items-center border p-4 text-center"
            >

              <Typography variant="h4" className="my-3" color="blue-gray">
                Email Verification
              </Typography>
              <Typography variant="paragraph" >
                We have sent a code to your Email {newData?.email}
              </Typography>
            </CardHeader>
            <CardBody>
              <form autoComplete='false' onSubmit={handleSubmit}>
                <div className="p-0">
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, checkOtp: target.value })}
                      variant="standard"
                      label="Code Verification"
                      type='number'
                    // required
                    />
                  </div>

                  <div className="my-5">
                    <Button type='submit' fullWidth variant="gradient" color="red">
                      Verification
                    </Button>
                  </div>

                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
