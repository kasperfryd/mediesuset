import React, {useState, useEffect} from 'react'
import festivalplads from '../../images/mediesuset-map.jpg'
import Style from '../../styles/info.module.scss'

function Info () {

    const [imageData, setImageData] = useState(null)

    const getAllImages = () => {
        let url = `https://api.mediehuset.net/mediesuset/images`
        fetch(url)
        .then(response => response.json())
        .then(json => setImageData(json))
    }
    

    useEffect(() => {
        getAllImages()
    }, [])


    return (
    <>
    <div className={Style.bannerimage} style={imageData && {backgroundImage: `url(${imageData.items[8].image})`}}></div>
    <h2>PRAKTISK INFORMATION</h2>
        <section className={Style.grid}>
            <div>
                <p><b>Adresse: </b> Øster Uttrup Vej 1, 9000 Aalborg</p>
                <p><b>Telefon:</b> 55225522</p>
                <div>
                <iframe frameBorder="0" style={{ width: "100%", height: "40vh"}} 
                    src="https://maps.google.com/maps?q=tech%20college%20aalborg&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                </div>
            </div>

            <div>
                <p>Kort over festivalpladsen</p>
                <img className={Style.map} src={festivalplads}></img>
            </div>

        </section>
    </>
    )
}

export default Info