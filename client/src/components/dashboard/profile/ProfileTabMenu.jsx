import { Tab, Tabs, TabsBody, TabsHeader, TabPanel } from '@material-tailwind/react'
import React from 'react'
import OrderList from './OrderList'
import WishList from './WishList'
import AddressList from './AddressList'
import PaymentList from './PaymentList'

const ProfileTabMenu = ({ userData, theme, isEdit }) => {
  const { paymentMethods, wishList, addresses, orders } = userData
  const tabData = [
    {
      label: 'Orders',
      value: 'orders',
      desc: <OrderList theme={theme} orders={orders} />,
    },
    {
      label: 'Wishlist',
      value: 'wishlist',
      desc: <WishList theme={theme} wishList={wishList} />,
    },
    {
      label: 'Addresses',
      value: 'addresses',
      desc: <AddressList theme={theme} addresses={addresses} />,
    },
    {
      label: 'Payments',
      value: 'payment_methods',
      desc: <PaymentList theme={theme} paymentMethods={paymentMethods} />,
    },
  ]

  return (
    <div className="grid grid-cols-1">
      <Tabs value="html">
        <TabsHeader>
          {tabData.map(({ label, value }) => (
            <Tab disabled={isEdit} key={value} value={value}>
              <span className="font-bold">{label}</span>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {tabData.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default ProfileTabMenu
