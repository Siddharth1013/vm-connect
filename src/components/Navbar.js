"use client";
import Link from 'next/link';
import {DesktopOutlined,FileOutlined,DashboardOutlined,PlayCircleOutlined,ReconciliationOutlined,CalendarOutlined,TagsOutlined,LogoutOutlined} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Login from './Login';
import '../app/ui/Navbar.css'


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, href) {
  return {
    key,
    icon,
    label: href ? (<Link href={href}>{label}</Link>):(label)
  };
}
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  backgroundColor:'#3d3d3d',
  padding: '0',
  margin: '0',
  border:''  
};
const items = [
  getItem('Dashboard', '1', <DashboardOutlined />,'/dashboard'),
  getItem('Device', '2', <DesktopOutlined />,'/device'),
  getItem('Media', '3', <PlayCircleOutlined />,'/media'),
  getItem('Playlists', '4', <FileOutlined />,'/playlist'),
  getItem('Policy', '5', <ReconciliationOutlined />,'/policy'),
  getItem('Schedules', '6', <CalendarOutlined />,'/schedules'),
  getItem('Tags', '7', <TagsOutlined />,'/tags'),
];

const bottomItems = [
  getItem('Logout', '8', <LogoutOutlined />, '/login'),
];

const Navbar = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router=useRouter(); //Remove after building dashboard
  const pathname=usePathname();
  useEffect(()=>{
    if(pathname=='/')
      router.push('/device')
  },[])
  
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical">
          <Image src={"/android-chrome-192x192.png"} width={30} height={30} alt=''></Image>
          <div style={{marginLeft:'2%'}}>ValueConnect</div>
        </div>
        <Menu className='nav-menu' mode="inline" items={items} defaultSelectedKeys={['2']}/>
        <Menu className='nav-menu-bot' theme='light' mode="inline" items={bottomItems} />
      </Sider>
      <Layout style={{marginInlineStart: 200,backgroundColor:'#F8FBFB'}}>
        <Content >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navbar;