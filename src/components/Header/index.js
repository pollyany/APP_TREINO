import { FiMenu } from "react-icons/fi";
import './_header.scss'
import {useState} from 'react'
import Sidebar from "../Sidebar/SidebarMobile";
import SidebarMobile from "../Sidebar/SidebarMobile";
export default function Header() {
  const [sidebar, setSidebar] = useState(false)
  function showSidebar() {
    setSidebar(!sidebar)
  }
  return(
    <>
    <header className="header">
      <nav>
        <FiMenu size={30} onClick={() => showSidebar()}/>
        {sidebar && (
          <SidebarMobile close={() => setSidebar(!sidebar)}/>
        )}
      </nav>
      <span>GYM PRO</span>
    </header>
    </>
  )
}