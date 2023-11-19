import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react'
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import appConfig from '../../config'

export default function UserDropDwon() {
  //? hoke
  const router = useRouter()
  const {
    data: { user },
  } = useSession()

  const handleSignOut = () => {
    signOut()
    router.refresh()
  }

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="candice wu"
          className="cursor-pointer shadow-md"
          size="sm"
          src={`${appConfig.apiBaseUrl}/uploads/${user?.photo || 'user.png'}`}
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="py-2">
          <Link className="flex items-center gap-2" href="/dashboard">
            <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
            <Typography variant="small" className="m-0 font-normal">
              My Profile
            </Typography>
          </Link>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 bg-red-400 py-2 text-white"
        >
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="m-0 font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
