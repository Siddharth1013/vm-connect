'use client';
import Link from "next/link"
import Image from 'next/image';
import styled from "styled-components";
import { usePathname } from "next/navigation";

const NavLink=styled.div`
  padding:20px;
  text-align:center;
  border:1px solid black;
`;

export default function Navbar() {
  const pathname=usePathname();
  return (
    <div style={{height:'100vh'}}>
      <div style={{backgroundColor:'white',padding:'10px',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Link href={'/'} style={{textDecoration:'none',color:'black'}}>
          <Image src="/android-chrome-192x192.png" alt="alt" width={30} height={30} /> 
        </Link>
        <p><b>Project K</b></p>
      </div>
      <NavLink style={{backgroundColor: pathname === '/dashboard' ? 'black' : 'white'}}>
        <Link href={'/dashboard'} style={{textDecoration:'none',color:'black',color: pathname === '/dashboard' ? 'white' : 'black'}}>
          Dashboard
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/device' ? 'black' : 'white'}}>
        <Link href={'/device'} style={{textDecoration:'none',color:'black',color: pathname === '/device' ? 'white' : 'black'}}>
          Device
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/media' ? 'black' : 'white'}}>
        <Link href={'/media'} style={{textDecoration:'none',color:'black',color: pathname === '/media' ? 'white' : 'black'}}>
          Media
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/playlist' ? 'black' : 'white'}}>
        <Link href={'/playlist'} style={{textDecoration:'none',color:'black',color: pathname === '/playlist' ? 'white' : 'black'}}>
          Playlist
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/schedules' ? 'black' : 'white'}}>
        <Link href={'/schedules'} style={{textDecoration:'none',color:'black',color: pathname === '/schedules' ? 'white' : 'black'}}>
          Schedules
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/policy' ? 'black' : 'white'}}>
        <Link href={'/policy'} style={{textDecoration:'none',color:'black',color: pathname === '/policy' ? 'white' : 'black'}}>
          Policy
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor: pathname === '/tags' ? 'black' : 'white'}}>
        <Link href={'/tags'} style={{textDecoration:'none',color:'black',color: pathname === '/tags' ? 'white' : 'black'}}>
          Tags
        </Link>
      </NavLink>
      <NavLink style={{backgroundColor:'orangered',color:pathname === '/logout' ? 'black' : 'white'}}>
        <Link href={'/logout'} style={{textDecoration:'none',color:'black',color: pathname === '/logout' ? 'white' : 'black'}}>
          Logout
        </Link>
      </NavLink>    
    </div>
  )
}
