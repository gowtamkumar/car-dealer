import Link from 'next/link'
import { AiFillPhone, AiOutlineNotification } from 'react-icons/ai'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { FaAppStore, FaGooglePlay } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="inset-0 bg-black/90 text-blue-gray-200">
      <div className="min-h-96 container mx-auto">
        <div className="mx-5 grid grid-cols-1 gap-5 py-8 md:mx-0 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <h1>SUPPORT</h1>
            <div className="mb-3 flex flex-row items-center rounded-md p-5 ring-1">
              <AiFillPhone />
              <div className="mx-3">|</div>
              <div>
                <span className="text-sm">10AM-7PM</span>
                <div className="font-bold text-red-500">16793</div>
              </div>
            </div>
            <div className="mb-5 flex flex-row items-center rounded-md p-5 ring-1">
              <AiOutlineNotification />
              <div className="mx-3">|</div>
              <div>
                <span className="text-sm">Store Locator</span>
                <div className="font-bold text-red-500">Find Our Stores</div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <h1>ABOUT US</h1>
            <ul>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  EMI Terms
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Privacy Policy
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Star Point Policy
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Brands
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="h-1"> </h1>
            <ul>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  About Us
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Terms & Conditions
                </Link>
              </li>
              <li className="text-slate-400 mb-4">
                <Link className="hover:text-red-500 hover:underline" href="/">
                  Blog
                </Link>
              </li>
              <li className="mb-4">
                <Link className="text-red-500 hover:underline" href="/">
                  Online Service Support
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
            <h1>STAY CONNECTED</h1>
            <ul>
              <li className="text-slate-400 mb-4">
                Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square, Dhaka 1000
              </li>
              <li className="text-slate-400 mb-4">Email: info@.com</li>
            </ul>
          </div>
        </div>
        <div className="outline-slate-400 flex flex-col items-center justify-between py-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <small className="text-slate-600 text-sm">
              Experience Star Tech App on your mobile:
            </small>
            <div className="flex cursor-pointer flex-row gap-2 rounded-md px-5 py-2  ring-1 md:items-center">
              <FaGooglePlay />
              <span>|</span>
              <div>
                <small className="text-gray-600">Download on</small>
                <p className="m-0 text-gray-400">Google Play</p>
              </div>
            </div>
            <div className="flex cursor-pointer flex-row gap-2 rounded-md px-5 py-2  ring-1 md:items-center">
              <FaAppStore />
              <span>|</span>
              <div>
                <small className="text-gray-600">Download on</small>
                <p className="m-0 text-gray-400">App Store</p>
              </div>
            </div>
          </div>
          <div>
            <ul className="m-0 p-0">
              <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                <Link href="/">
                  <BsFacebook className="text-lg" />
                </Link>
              </li>
              <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                <Link href="/">
                  <BsLinkedin className="text-lg" />
                </Link>
              </li>
              <li className="bg-slate-700 ms-3 inline-block cursor-pointer rounded-full p-3 hover:ring-2">
                <Link href="/">
                  <BsInstagram className="textlgl" />
                </Link>
              </li>
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
