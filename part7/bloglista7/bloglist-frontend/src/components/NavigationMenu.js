import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core"

import { Link } from "react-router-dom"
import LoginComponent from "./LoginComponent"


const NavigationMenu = () => {
  

  return (
    <div style={{}}>
      <AppBar position="static">
        <Toolbar>
          <div style={{flexGrow: 1}}>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>

            <Button color='inherit'>
              <Link to="/">home</Link>
            </Button>
            <Button color='inherit'>
              <Link to="/blogs">blogs</Link>
            </Button>
            <Button color='inherit'>
              <Link to="/users">users</Link>
            </Button>
          </div>
          <div>
            <LoginComponent />
          </div>
        </Toolbar>
      </AppBar>
    </div >
  )
}

export default NavigationMenu