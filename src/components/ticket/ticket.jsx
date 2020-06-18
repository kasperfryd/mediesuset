import React,{useEffect, useState} from 'react'
import Style from '../../styles/ticket.module.scss'

import {
    Link
  } from "react-router-dom";

function Tickets(props) {

    const [ticketData, setTicketData] = useState(null)
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState(null)
   
    const getTickets = () => {
        let url = `https://api.mediehuset.net/mediesuset/tickets`
        fetch(url)
        .then(response => response.json())
        .then(json => setTicketData(json))
    }
    useEffect(() => {
        getTickets()
    }, [])

    console.log(ticketData)

    return (
        <section>
            <h2>KØB BILLET</h2>
            <div className={Style.header}><p>PARTOUT BILLET </p></div>
            <div className={Style.ticketgrid}>
                {ticketData && ticketData.items.map((item, index) => {
                    if (index < 2){
                return (<div className={Style.ticketitem}>
                    <p onClick={() => {active ? setActive(false): setActive(true); setSelected(item.name)}}>{item.name}</p><b>{item.price} DKK</b>
                    <Link to={"/checkout"} onClick={() =>props.setTicketId(item.id)}><button>KØB BILLET</button></Link>
                <div className={active && selected === item.name ? Style.shown: Style.hidden}>{item.description}</div>
                </div>)
                }})}
            </div>
            <div className={Style.header}><p> ENKELTDAGSBILLET</p></div>
            <div className={Style.ticketgrid}>
                {ticketData && ticketData.items.map((item, index) => {
                    if (index > 2){
                return (<div className={Style.ticketitem}>
                    <p onClick={() => {active ? setActive(false): setActive(true); setSelected(item.name)}}>{item.name}</p><b>{item.price} DKK</b>
                    <Link to={"/checkout"} onClick={() =>props.setTicketId(item.id)}><button>KØB BILLET</button></Link>
                <div className={active && selected === item.name ? Style.shown: Style.hidden}>{item.description}</div>
                </div>)
                }})}
            </div>
            
        </section>
    )
}

export default Tickets