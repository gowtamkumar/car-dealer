'use client'
import React, { useEffect, useState } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from '@material-tailwind/react'
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  HomeIcon,
  CloudArrowUpIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline'

import Link from 'next/link'
import UserDropDwon from '../ui/UserDropDwon'
import dashboardRoute from '../dashboard/_dashboardRoute'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import appConfig from '@/config'
import { Gets } from '@/lib/api'

function NavListMenu({ session }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const renderItems = dashboardRoute
    .filter((item) => item.isMenuItem)
    .map(({ icon, title, path }, key) => (
      <Link href={path} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:border-none">
          <div className={`rounded-lg bg-red-500/10 p-3 text-red-300`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 w-6',
            })}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="flex items-center text-sm">
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ))

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      // allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Menu
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? 'rotate-180' : ''
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180' : ''
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl border-none lg:block">
          <ul className="grid gap-y-2 border-none md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavList({ session = {} }) {
  const { data } = session
  const { user = {} } = data || {}

  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <Typography as={Link} href="/" variant="small" color="blue-gray" className="font-normal">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <HomeIcon className="h-[18px] w-[18px]" />
          Home
        </ListItem>
      </Typography>
      <Typography as={Link} href="/about" variant="small" color="blue-gray" className="font-normal">
        <ListItem className="flex  items-center gap-2 py-2 pr-4">
          <UserCircleIcon className="h-[18px] w-[18px]" />
          About Us
        </ListItem>
      </Typography>
      <Typography
        as={Link}
        href="/products"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex  items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          Cars
        </ListItem>
      </Typography>

      {session?.status === 'authenticated' && (
        <>
          {/* <Typography
            as={Link}
            href="/dashboard/add-product/new"
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <ListItem className="flex  items-center gap-2 py-2 pr-4">
              <CloudArrowUpIcon className="h-[18px] w-[18px]" />
              Upload Car
            </ListItem>
          </Typography>

          <Typography
            as={Link}
            href="/dashboard/cars-list"
            variant="small"
            color="blue-gray"
            className="hidden font-normal lg:block"
          >
            <ListItem className="flex  items-center gap-2 py-2 pr-4">
              <QueueListIcon className="h-[18px] w-[18px]" />
              Car List
            </ListItem>
          </Typography> */}

          {user?.role !== 'Seller' && <NavListMenu session={session} />}
        </>
      )}
    </List>
  )
}

export default function NavbarMenu() {
  const [openNav, setOpenNav] = React.useState(false)
  const [query, setQuery] = React.useState('')

  //Query
  const session = useSession()
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/products?search=${query || ''}`)
  }
  const [settings, setSettings] = useState({})

  useEffect(() => {
    ; (async () => {
      const params = { api: 'settings' }
      const res = await Promise.resolve(Gets(params))
      if (res?.data) {
        setSettings(res?.data[0])
      } else {
        setSettings({})
      }
    })()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  return (
    <Navbar className="fixed inset-0 top-0 z-50 h-max max-w-full rounded-none px-4 py-0 shadow-sm lg:px-8">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as={Link} href="/" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <img
            src={`${appConfig.apiBaseUrl}/uploads/${settings?.logo || 'logo.png'}`}
            className="lg:h-11 h-8 w-auto"
            alt="logo"
          />
        </Typography>
        <div className="hidden items-center gap-2 lg:flex">
          <NavList session={session} />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <div className="relative me-3 flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Search here..."
              className="pr-20 focus:border-[1px]"
              containerProps={{
                className: 'min-w-[250px] focus:border-[1px]',
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="sm" onClick={handleSearch} className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </div>
          {session.status === 'authenticated' ? (
            <UserDropDwon />
          ) : (
            <div className="flex items-center gap-2">
              <Typography
                as={Link}
                href="/login"
                variant="small"
                color="blue-gray"
                className="font-normal hover:underline"
              >
                Sign In
              </Typography>
              <span>|</span>
              <Typography
                as={Link}
                href="/signup"
                variant="small"
                color="blue-gray"
                className="font-normal hover:underline"
              >
                Sign Up
              </Typography>
            </div>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList session={session} />
        <div className="relative me-3 flex w-full gap-2 md:w-max">
          <Input
            type="search"
            label="Search here..."
            className="pr-20 focus:border-[1px]"
            containerProps={{
              className: 'min-w-[250px] focus:border-[1px]',
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="!absolute right-1 top-1 rounded bg-red-400"
          >
            Search
          </Button>
        </div>
        {session.status === 'authenticated' ? null : (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        )}
      </Collapse>
    </Navbar>
  )
}
