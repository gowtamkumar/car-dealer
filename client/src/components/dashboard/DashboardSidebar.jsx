'use client'
import React from 'react'
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { PresentationChartBarIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import DashboardRoute from './_dashboardRoute'

export default function DashboardSidebar() {
  return (
    <aside className="hidden lg:col-span-3 lg:block">
      <Card className="lg:shadow-lg lg:shadow-blue-gray-900/5">
        <List>
          {DashboardRoute.filter((item) => item.isMenuItem).map((item, idx) => (
            <Link key={idx} href={item.path}>
              <ListItem>
                <ListItemPrefix>
                  <item.icon className="h-5 w-5" />
                </ListItemPrefix>
                {item.title}
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
    </aside>
  )
}
