import React, {useState, useEffect} from 'react'
import Style from '../../styles/lineup.module.scss'

function LineUp() {
    
    const [active, setActive] = useState(0)
    const [artistData, setArtistData] = useState(null)
    const [showAll, setShowAll] = useState(true)

    const colorArray = ["#A63C4F","#396999","#728C4A","#8B3B8C"]

    const handleActive = (val) => {
        setActive(val)
        setShowAll(false)
    }

    const getAllArtists =() => {
        let url = `https://api.mediehuset.net/mediesuset/events`
            fetch(url)
            .then(response => response.json())
            .then(json => setArtistData(json))
    }

    const showAllArtists = () => {
        setShowAll(true)
    }


    const getDay = (day) => {
        switch(day){
            case "08": 
                return "Onsdag"
            
            case "09":
                return "Torsdag"
            
            case "10":
                return "Fredag"
        
            case "11":
                return "Lørdag"
        }
    }
    

    useEffect(() => {
        getAllArtists()
    }, [])

    console.log(artistData)

    return(
        <section className={Style.lineupwrapper}>
            <h2>LINE-UP</h2>
            <div className={Style.lineupnav}>
                <p className={active === "all" ? Style.active: Style.default} onClick={() => showAllArtists()}>A-Å</p>
                <p className={active === "Rød scene" ? Style.red: Style.default} onClick={() => handleActive("Rød scene")}>RØD SCENE</p>
                <p className={active === "Blå scene" ? Style.blue: Style.default} onClick={() => handleActive("Blå scene")}>BLÅ SCENE</p>
                <p className={active === "Grøn scene" ? Style.green: Style.default} onClick={() => handleActive("Grøn scene")}>GRØN SCENE</p>
                <p className={active === "Lilla scene" ? Style.purple: Style.default} onClick={() => handleActive("Lilla scene")}>LILLA SCENE</p>
                <p>FILTER</p>
            </div>

            <div className={Style.lineupgrid}>
            {artistData && artistData.items && artistData.items.map((item, index) => {
            if (item.stage_name === active && !showAll){
                return (
                    <div className={Style.griditem}>
                        <div style={{backgroundImage:`url(${item.image})`}}></div>
                        <div style={{backgroundColor:colorArray[Math.floor(Math.random() * colorArray.length)]}}>
                            <h5 key={index}>{item.title}</h5>
                            <p>{getDay(item.local_time.substring(8, 10))} {item.local_time.substring(11, 16)}</p>
                        </div>
                    </div>
                    )
            }
        if (showAll){
            return (
                <div className={Style.griditem}>
                <div style={{backgroundImage:`url(${item.image})`}}></div>
                <div style={{backgroundColor:colorArray[Math.floor(Math.random() * colorArray.length)]}}>
                    <h5 key={index}>{item.title}</h5>
                     <p>{getDay(item.local_time.substring(8, 10))} {item.local_time.substring(11, 16)}</p>
                </div>
            </div>
                )
        }}
        )}
        </div>
        </section>
    )
}
export default LineUp