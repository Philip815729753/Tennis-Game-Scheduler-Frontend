"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ApartmentOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // control the status of the sidebar
  const [selectedKey, setSelectedKey] = useState('dashboard'); // the default highlighting option

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

    // save the selected option to localStorage every time when it is clicked
    const handleMenuClick = (key: string) => {
      setSelectedKey(key); // update the status
      localStorage.setItem('selectedMenuKey', key); // store to localStorage
    };
  
    // read the selected option from localStorage when refreshing the page
    useEffect(() => {
      const savedKey = localStorage.getItem('selectedMenuKey');
      if (savedKey) {
        setSelectedKey(savedKey);
      }
    }, []);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <AppstoreOutlined />,
      label: 'Dashboard',
      path: '/pages/dashboard',
    },
    {
      key: 'competitions',
      icon: <ApartmentOutlined />,
      label: 'Competitions',
      path: '/pages/competitions',
    },
    // {
    //   key: 'schedule',
    //   icon: <ApartmentOutlined />,
    //   label: 'Schedule',
    //   path: '/pages/schedule',
    // },
    // {
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   label: 'Settings',
    //   path: '/settings',
    // },
  ];

  const menuHiddenItems = [
    "Dashboard",
    "Competitions",
    // "schedule"
    // "Settings"
  ]

  return (
    <div
      className={`bg-[#3b4f84] h-full text-white transition-all duration-300 h-full z-10 ${
        isOpen ? 'w-48' : 'w-20'
      }`}
    >
      {/* Sidebar header with toggle button icon */}
      <div className="p-4 flex justify-center" style={{ height: '72px' }}>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? (
            <MenuFoldOutlined style={{ fontSize: '24px' }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: '24px' }} />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={!isOpen}
        selectedKeys ={[selectedKey]}
        style={{ height: '100%', borderRight: 0, backgroundColor: '#3b4f84' }}
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item.key)}>
            <Link href={item.path}>
              <div
                className={`sidebar-item-container flex items-center ${
                  isOpen ? 'justify-start' : 'justify-center'
                }`}
                style={{ position: 'relative' }}
              >
                {/* show sidebar title when expanding */}
                {isOpen ? (
                  <span className="ml-4">{item.label}</span>
                )
                 : (
                  // show title when hover 
                  <span>{menuHiddenItems[index]}</span>
                )
                }
              </div>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;


