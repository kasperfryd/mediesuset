import React, {useEffect, useState} from 'react'
import Style from '../../styles/footer.module.scss'
import Logo from '../../images/Hancock-kvalitet-logo.png'

function Footer () {

    const [data, saveData] = useState(null)
    const getImage = () => {
        let url = "https://api.mediehuset.net/mediesuset/images"
        fetch(url)
        .then(response => response.json())
        .then(json => saveData(json))
    }

    useEffect(() => {
        getImage()
    }, [])

    return (
        <> 
        <section className={Style.footer} style={{backgroundImage:`url(${data && data.items[4].image})`}}>
            <h4>TILMELD NYHEDSBREV</h4>
            <h5>Få seneste nyt sendt direkte til din indbakke</h5>
            <div className={Style.wrapper}>
                <input type="email"></input>
                <button>TILMELD NYHEDSBREV</button>
            </div>
            <img className={Style.logo} src={Logo} alt="hancock-logo"></img>
        </section>
        <section className={Style.footerbottom}></section>
        </>
    )

}

export default Footer