import React from 'react'
import Style from '../../styles/follow.module.scss'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

function FollowUs () {

    return (
        <section className={Style.follow}>
            <h4 className={Style.top}>FØLG OS</h4>
            <div className={Style.facebook} ><FaFacebook/></div>
            <div className={Style.twitter} ><FaTwitter/></div>        
        </section>
    )
}

export default FollowUs