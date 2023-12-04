'use client'
import { Gets } from '@/lib/api'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiFillPhone, AiOutlineNotification } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
  const [data, setData] = useState({})
  const session = useSession()
  console.log('session:', session)

  useEffect(() => {
    ; (async () => {
      const params = { api: 'settings' }
      const res = await Promise.resolve(Gets(params))
      if (res?.data) {
        setData(res?.data[0])
      } else {
        setData({})
      }
    })()
  }, [])

  return (
    <footer className="inset-0 bg-black/90 text-blue-gray-200">
      <div className="min-h-96 container mx-auto">
        <div className="mx-5 grid grid-cols-1 gap-5 py-8 md:mx-0 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h1 className="mb-2 font-bold">SUPPORT</h1>
            <div className="mb-3 flex w-4/5 flex-row items-center rounded-md p-5 ring-1">
              <AiFillPhone />
              <div className="mx-3">|</div>
              <div>
                <span className="text-sm">24/7 Service</span>
                <div className="font-bold text-red-500">{data?.supportPhone}</div>
              </div>
            </div>
            <div className="mb-3 flex w-4/5 flex-row items-center rounded-md p-5 ring-1">
              <AiOutlineNotification />
              <div className="mx-3">|</div>
              <div>
                <span className="text-sm">Our Locator</span>
                <div className="font-bold text-red-500">Find Our Stores</div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <h1 className="mb-3"></h1>
            <ul>
              <li className="text-slate-400 mb-2">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li className="text-slate-400 mb-2">
                <Link className="hover:text-red-500 hover:underline" href="/about">
                  About Us
                </Link>
              </li>
              <li className="text-slate-400 mb-2">
                <Link className="hover:text-red-500 hover:underline" href="/products">
                  Cars
                </Link>
              </li>
              <li className="text-slate-400 mb-2">
                <Link
                  className="hover:text-red-500 hover:underline"
                  href={session.status === 'unauthenticated' ? '/login' : '/dashboard/cars-list'}
                >
                  Cars List
                </Link>
              </li>
              <li className="text-slate-400 mb-2">
                <Link
                  className="hover:text-red-500 hover:underline"
                  href={session.status === 'unauthenticated' ? '/login' : '/dashboard/cars-list'}
                >
                  Upload Car
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="h-1"> </h1>
            <ul>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Online Delivery
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Return & Return Policy
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Contact Us
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-red-500 hover:underline" href="/">
                  Camplain / Advice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-2">STAY CONNECTED</h1>
            <ul>
              <li className="text-slate-400 mb-4 font-bold">{data?.fullAddress}</li>
              <li className="text-slate-400 mb-4">Email: {data?.email}</li>
            </ul>
          </div>
        </div>
        <div className="outline-slate-400 flex flex-col items-center justify-between py-4 md:flex-row">
          <div className="flex items-center gap-4 md:flex-row">
            <h1 className="text-slate-600 text-sm">Facebook Page:</h1>
            <Link
              href={`${data?.facebookUrl}`}
              className="flex cursor-pointer flex-row gap-2 rounded-md px-5 py-2  ring-1 md:items-center"
            >
              <FaFacebookF />
              <span>|</span>
              <div>
                <small className="text-gray-600">Visit Now</small>
                <p className="m-0 text-gray-400">Facebook Page</p>
              </div>
            </Link>
          </div>
          <div>
            <ul className="m-0 p-0">
              {data?.facebookUrl && (
                <Link href={`${data?.facebookUrl}`}>
                  <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                    <BsFacebook className="text-lg" />
                  </li>
                </Link>
              )}
              {data?.instagram && (
                <Link href={`${data?.instagram}`}>
                  <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                    <BsInstagram className="text-lg" />
                  </li>
                </Link>
              )}
              {data?.youtubeUrl && (
                <Link href={`${data?.youtubeUrl}`}>
                  <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                    <FaYoutube className="text-lg" />
                  </li>
                </Link>
              )}
              {data?.twitter && (
                <Link href={`${data?.twitter}`}>
                  <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                    <FaTwitter className="text-lg" />
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 md:flex-row">
          <small>© 2023 Masud Pervez | All rights reserved</small>
          <div>
            <small>Powered By: Masud Pervez</small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
