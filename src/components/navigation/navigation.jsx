import React, {useState} from 'react'
import Style from '../../styles/navigation.module.scss'
import Logo from '../../images/mediehuset-logo.png'
 


import {
    Link
  } from "react-router-dom";

function Navigation(props) {

    const [dropStatus, setDropStatus] = useState(false);

    const showDropdown = () => {
        setDropStatus(true)
    }

    const hideDropdown = () => {
        setDropStatus(false)
    }

    const logOut = () => {
        props.setLoginData(null)
        sessionStorage.removeItem("token")
    }

    return ( 
        <nav className={Style.navigation}>
            <div className={Style.navLogo}>
                <img className={Style.logo} src={Logo} alt="LOGO"></img>
                <p className={Style.logotext}><h5><b>MEDIE</b>SUSET</h5> <br/> <b>4 - 5 - 6 - 7. JULI 2019</b></p>
            </div>
            <ul className={Style.linkcontainer}>
                <li className={Style.køb}><Link to="/billet"><p>KØB BILLET</p></Link></li>
                <li><Link to="/"><p>NYHEDER</p></Link></li>
                <div className={Style.dropdown}><p>EVENTS</p>
                    <div className={Style.dropdowncontent}>
                        <li><Link to="/program"><p>PROGRAM</p></Link></li>
                        <li><Link to="/lineup"><p>LINE-UP</p></Link></li>
                    </div>
                </div>
                <li><Link to="/camps"><p>CAMPS</p></Link></li>
                <li><Link to="/info"><p>PRAKTISK INFO</p></Link></li>
                
                {!props.loginData && 
                    <li><Link to="/login"><p>LOGIN</p></Link></li>
                }
                {props.loginData && 
                          <div className={Style.dropdown}><p>MIN SIDE</p>
                          <div className={Style.dropdowncontent}>
                              <li><Link to="/minside"><p>Mit program</p></Link></li>
                              <li><Link to="/minbillet"><p>Min billet</p></Link></li>
                              <li><p onClick={() => logOut()}>Log ud</p></li>
                          </div>
                      </div>
                }
            </ul>
        </nav>
    )
}

export default Navigation