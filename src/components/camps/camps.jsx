import React, {useState, useEffect} from 'react';
import Style from '../../styles/camps.module.scss'


function Camps() {

    const [campData, setCampData] = useState(null)
    const [imageData, setImageData] = useState(null)
    const [selected, setSelected] = useState(null)

    const getCamps = () => {
        let url = `https://api.mediehuset.net/mediesuset/camps`
        fetch(url)
        .then(response => response.json())
        .then(json => setCampData(json))
    }

    const getAllImages = () => {
        let url = `https://api.mediehuset.net/mediesuset/images`
        fetch(url)
        .then(response => response.json())
        .then(json => setImageData(json))
    }

    const handleSelected = (id) => {
        let url = `https://api.mediehuset.net/mediesuset/camps/${id}`
        fetch(url)
        .then(res => res.json())
        .then(json => setSelected(json))
        window.scrollTo(0,0)
    }


    useEffect(() => {
        getAllImages()
        getCamps()
        setSelected(null)
    }, [])

    const getAccess = (ticket) => {
        switch (ticket.length){
            case 6:
                return "Alle armbånd"

            case 2: 
                return "4 dages partout armbånd"

            case 1: 
                return "4 dages De Luxe partout armbånd"
        }
    }

    if (!selected){
    return (
        <section>
            <header>
                <div className={Style.bannerimage} style={imageData && {backgroundImage: `url(${imageData.items[7].image})`}}></div>
            </header>
                <h2>CAMPS</h2>
                <p className={Style.introtext}>På Mediesuset finder du tre camp områder som hver skiller sig ud med deres specielle stemning om du enten du er til fest og ballade eller komfort og service på højt niveua.
                    På alle camp områder er der adgang til forplejning i form af mad og drikke, og toilet og bade faciliteter. 
                    Camp områderne er placeret tæt på festivalpladsen så at vores gæster hurtigt kan komme til og fra områderne i mellem de mange events.
                    Det er muligt at reservere pladser på de forskellige camp områder - dog kræver Camp Kultunaut og De Luxe 4 dages partout armbånd og De Luxe Armbånd.
                    Reservation kan foretages når du bestiller billet.
                </p>
                <div className={Style.grid}>
                {campData && campData.items.map((item, index) => {
                    return (
                        <div key={index} className={Style.griditem}>
                            <div style={{backgroundImage: `url(${item.image})`}}></div>
                            <h4>{item.name}</h4>
                            <p className={Style.description}>{item.description.substring(0,196)}..</p>
                            <p><b>Adgang: </b> {getAccess(item.tickets)}</p>
                            <p><b>Samet antal pladser: </b> {item.num_people}</p>
                            <p><b>Ledige pladser: </b>{item.num_people - Math.floor(Math.random() * 100)}</p>
                            <button onClick={() => handleSelected(item.id)}> LÆS MERE</button>
                        </div>
                    )    
                })}
                </div>        
        </section>
    )
    }

    if (selected){
        return (
            <>
            <header>
                <div onClick={()=>{setSelected(null)}} className={Style.bannerimage} style={{backgroundImage: `url(${selected.item.image})`,   cursor: "pointer"}}></div>
            </header>
            <section className={Style.singlecamp}>
            <h2>{selected.item.name}</h2>
            <div className={Style.singlecamptext}>
            <p>{selected.item.description}</p>
            <b>Adgang:</b>
            <p>{getAccess(selected.item.tickets)}</p>
            <p>Ved enkeltdags armbånd skal du huske at tjekke ud den efterfølgende dag inden kl. 10:00</p>
            <b>På {selected.item.name} får du:</b>
            <ul>
                {selected.item.facilities.map((item, index)=>{
                    return <li key={index}>{item.title}</li>
                })}
            </ul>
            <b>Åbningstider:</b>
            <p>Campen åbner tirsdag kl. 18:00 og lukker igen søndag kl 14.00, hvor alle skal have forladt området.</p>
            <b>Antal pladser i alt:</b>
            <p>{selected.item.num_people}</p>
            <b>Antal ledige pladser:</b>
            <p>{selected.item.num_people - Math.floor(Math.random() * 100)}</p>
            </div>
            </section>
            </>
        )
    }
}

export default Camps