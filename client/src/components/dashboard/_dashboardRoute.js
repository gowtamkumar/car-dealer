import {
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  CubeTransparentIcon,
  QueueListIcon,
  RectangleGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Cog8ToothIcon, PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/solid'

// ['admin', 'oparator', 'seller']
const role = 'admin'

const DashboardRoute = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    isMenuItem: true,
    icon: PresentationChartBarIcon,
    color: 'red',
  },
  {
    title: 'Upload',
    path: '/dashboard/upload',
    isMenuItem: role === 'seller',
    icon: PresentationChartBarIcon,
    color: 'red',
  },

  {
    title: 'Add Product',
    path: '/dashboard/add-product/new',
    isMenuItem: role !== 'seller',
    icon: BuildingStorefrontIcon,
    color: 'red',
  },
  {
    title: 'Car List',
    path: '/dashboard/cars-list',
    isMenuItem: true,
    icon: QueueListIcon,
    color: 'red',
  },
  {
    title: 'Brand',
    path: '/dashboard/brand',
    isMenuItem: role !== 'seller',
    icon: CubeTransparentIcon,
    color: 'red',
  },
  {
    title: 'Model',
    path: '/dashboard/model',
    isMenuItem: role !== 'seller',
    icon: RectangleGroupIcon,
    color: 'red',
  },
  {
    title: 'Model Code',
    path: '/dashboard/model-code',
    isMenuItem: role !== 'seller',
    icon: CubeIcon,
    color: 'red',
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    isMenuItem: true,
    icon: UserCircleIcon,
    color: 'red',
  },
  {
    title: 'User',
    path: '/dashboard/user',
    isMenuItem: role === 'admin',
    icon: UserIcon,
    color: 'red',
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    isMenuItem: role === 'admin',
    icon: Cog8ToothIcon,
    color: 'red',
  },
]

export default DashboardRoute
