import { Footer } from "./footer/footer"
import { NavBar } from "./navbar/navbar"
 
export default function Layout({ children }) {
  return (
    <>
      <NavBar/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}