'use client'
import React from 'react'
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
  Chip,
  Input,
  ListItemPrefix,
} from '@material-tailwind/react'
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
// import Image from 'next/image'
// import UserDropDwon from './UserDropDwon'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import UserDropDwon from '../ui/UserDropDwon'
import DashboardRoute from '../dashboard/_dashboardRoute'

const navListMenuItems = [
  {
    color: 'blue',
    icon: FlagIcon,
    title: 'About us',
    description: 'Learn about our story and our mission statement.',
  },
  {
    color: 'orange',
    icon: ChatBubbleOvalLeftIcon,
    title: 'Press',
    description: 'News and writings, press releases, and resources',
  },
  {
    color: 'green',
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        Careers{' '}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="We're hiring!"
          className="capitalize"
        />
      </div>
    ),
    description: 'We are always looking for talented people. Join us!',
  },
  {
    color: 'blue-gray',
    icon: FolderIcon,
    title: 'Legal',
    description: 'All the stuff that we dan from legal made us add.',
  },
]

const token = true

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const renderItems = navListMenuItems.map(({ icon, title, description, color }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg hover:border-none">
        <div className={`rounded-lg p-5 bg-${color}-50 text-${color}-500`}>
          {React.createElement(icon, {
            strokeWidth: 2,
            className: 'h-6 w-6',
          })}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm">
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
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
              Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl hover:border-none lg:block">
          <ul className="grid grid-cols-4 gap-y-2 border-none">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <Typography as={Link} href="/about" variant="small" color="blue-gray" className="font-normal">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
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
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          Products
        </ListItem>
      </Typography>
      <NavListMenu />

      {DashboardRoute.filter((item) => item.isMenuItem).map((item, idx) => (
        <Typography
          as={Link}
          key={idx}
          href={item.path}
          variant="small"
          color="blue-gray"
          className="block font-normal lg:hidden"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <item.icon className="h-[18px] w-[18px]" />
            {item.title}
          </ListItem>
        </Typography>
      ))}

      {token && (
        <Typography
          as={Link}
          href="/dashboard"
          variant="small"
          color="blue-gray"
          className="hidden font-normal lg:block"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <HomeIcon className="h-[18px] w-[18px]" />
            Dashboard
          </ListItem>
        </Typography>
      )}
    </List>
  )
}

export default function NavbarMenu() {
  const [openNav, setOpenNav] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const pathname = usePathname()

  // const handleSearch = () => {
  //   if (!query) return
  //   router.push(`/products?name=${query}`)
  //   return setQuery('')
  // }

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  return (
    <Navbar className="fixed inset-0 top-0 z-50 h-max max-w-full rounded-none px-4 py-2 shadow-sm lg:px-8">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as={Link} href="/" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          <img src="/logo.png" className="h-8 w-auto" alt="logo" />
        </Typography>
        <div className="hidden items-center gap-2 lg:flex">
          <NavList />
          {pathname !== '/products' && (
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
              <Button size="sm" className="!absolute right-1 top-1 rounded">
                Search
              </Button>
            </div>
          )}
          {token ? (
            <UserDropDwon />
          ) : (
            <div className="flex items-center gap-2">
              <Typography
                as={Link}
                href="/"
                variant="small"
                color="blue-gray"
                className="font-normal hover:underline"
              >
                Sign In
              </Typography>
              <span>|</span>
              <Typography
                as={Link}
                href="/"
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
        <NavList />
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
          <Button size="sm" className="!absolute right-1 top-1 rounded bg-red-400">
            Search
          </Button>
        </div>
        {token ? null : (
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
