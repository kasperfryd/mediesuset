import React, {useState, useEffect} from 'react'
import Style from '../../styles/program.module.scss'

import Modal from '../../components/modal/modal'

function Program(props) {

    const [day, setDay] = useState("Onsdag")
    const [eventData, setEventData] = useState(null)
    const [singleEventData, setSingleEventData] = useState(null)
    const [msg, setMsg] = useState("")

    const stages = ["Rød scene", "Blå scene", "Grøn scene", "Lilla scene"]
    const stagecolor = ["#A63C4F", "#396999", "#728C4A", "#8B3B8C"]

    const getAllEvents =() => {
        let url = `https://api.mediehuset.net/mediesuset/events`
            fetch(url)
            .then(response => response.json())
            .then(json => setEventData(json))
    }

    const getSingleEvent = (id) => {
        let url = `https://api.mediehuset.net/mediesuset/events/${id}`
        fetch(url)
        .then(response => response.json())
        .then(json => setSingleEventData(json))
    }

    const stageColor = (stage) => {
        switch(stage){
            case "Rød scene":
                return "#A63C4F"

            case "Blå scene":
                return "#396999"

            case "Grøn scene":
                return "#728C4A"

            case "Lilla scene":
                return "#8B3B8C"
        }
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

    const addToUserList = (id) => {
        let url ='https://api.mediehuset.net/mediesuset/programme'
        let update = new FormData()
            update.append('user_id', props.loginData.user_id)
            update.append('event_id', id)
            fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${props.loginData.access_token}`
                },
                body : update,
            })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(setMsg("Eventet er tilføjet til dit personlige program"))
        .catch(error => console.log(error))
    }


    useEffect(() => {
        getAllEvents()
    }, [])
 
    const modalContent =
        singleEventData && singleEventData.item && 
            <div className={Style.modal}> 
                <h2 style={{backgroundColor:`${stageColor(singleEventData.item.stage_name)}`}}>{singleEventData.item.stage_name.toUpperCase() +" KL. "+ singleEventData.item.local_time.substring(11, 16)}</h2>
                <h4>{singleEventData.item.title}</h4>
                <img src={singleEventData.item.image}></img>
                <p>{singleEventData.item.description}</p>
            </div>    
        
    if(!msg == ""){
        setTimeout(() => {
            setMsg("")
        }, 2000);
    }

    return (
        <section className={Style.wrapper}>
            <h2>PROGRAM</h2>
            <div className={Style.daynav}>
                <p className={day === "Onsdag" ? Style.active: ""} onClick={() => setDay("Onsdag")}>ONSDAG</p>
                <p className={day === "Torsdag" ? Style.active: ""} onClick={() => setDay("Torsdag")}>TORSDAG</p>
                <p className={day === "Fredag" ? Style.active: ""} onClick={() => setDay("Fredag")}>FREDAG</p>
                <p className={day === "Lørdag" ? Style.active: ""} onClick={() => setDay("Lørdag")}>LØRDAG</p>
            </div>
            <h4 style={{textAlign:"center", color:"green"}}>{msg}</h4>

            {stages.map((stage, index) => {
                return (
                <div key={index} className={Style.grid}>
                <h3 style={{backgroundColor:stagecolor[index]}}>{stage}</h3>
                {eventData && eventData.items && eventData.items.map((item, index) => {
                    if (item.stage_name === stage && day === getDay(item.local_time.substring(8, 10))){
                        return (               
                            <div key={index} className={Style.griditem}>
                            <p>{item.local_time.substring(11, 16)}</p><p onClick={() => {props.setModalVisible(true); getSingleEvent(item.id)}} className={Style.title}>{item.title}</p>
                            {props.loginData && <button onClick={() => addToUserList(item.id)}>Tilføj</button>}
                            </div>                    
                        )
                    }
                })}
                </div>
            )})
            }

            {props.modalVisible && <Modal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} child={modalContent}/>}
        </section>
    )
}

export default Program;