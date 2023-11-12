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
  },
  {
    title: 'Upload',
    path: '/dashboard/upload',
    isMenuItem: role === 'seller',
    icon: PresentationChartBarIcon,
  },
  
  
  
  {
    title: 'Add Product',
    path: '/dashboard/add-product/new',
    isMenuItem: role !== 'seller',
    icon: BuildingStorefrontIcon,
  },
  {
    title: 'Product List',
    path: '/dashboard/product-list',
    isMenuItem: true,
    icon: QueueListIcon,
  },
  {
    title: 'Brand',
    path: '/dashboard/brand',
    isMenuItem: role !== 'seller',
    icon: CubeTransparentIcon,
  },
  {
    title: 'Model',
    path: '/dashboard/model',
    isMenuItem: role !== 'seller',
    icon: RectangleGroupIcon,
  },
  {
    title: 'Model Code',
    path: '/dashboard/model-code',
    isMenuItem: role !== 'seller',
    icon: CubeIcon,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    isMenuItem: true,
    icon: UserCircleIcon,
  },
  {
    title: 'User',
    path: '/dashboard/user',
    isMenuItem: role === 'admin',
    icon: UserIcon,
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    isMenuItem: role === 'admin',
    icon: Cog8ToothIcon,
  },
]

export default DashboardRoute
