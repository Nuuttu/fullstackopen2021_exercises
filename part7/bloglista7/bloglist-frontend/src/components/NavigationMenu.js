import { Link } from "react-router-dom"
import LoginComponent from "./LoginComponent"


const NavigationMenu = () => {
  return (
    <div>
      <Link to="/">home</Link> - 
      <Link to="/blogs">blogs</Link> - 
      <Link to="/users">users</Link>
      <LoginComponent />
    </div>
  )
}

export default NavigationMenu