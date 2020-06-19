import React, {useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navigation from './components/navigation/navigation'
import FollowUs from './components/follow/follow'
import Footer from './components/footer/footer'
import News from './components/news/news'
import LineUp from './components/lineup/lineup'
import Program from './components/program/program'
import Tickets from './components/ticket/ticket'
import Camps from './components/camps/camps'
import Info from './components/info/info'
import Login from './components/login/login'
import MySite from './components/mysite/mysite'
import Checkout from './components/checkout/checkout'
import MyTickets from './components/mytickets/mytickets'

function App() {

  const [loginData, setLoginData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [ticketId, setTicketId] = useState(null)

  const validateEmail = (mail) =>  
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){

        return (true)
    }
    else
    return (false)
}
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      console.log("SESSIONSTORAGE IS PRESENT")
      setLoginData(JSON.parse(localStorage.getItem('token')))
    }
  }, [])

  return (
    <Router>
      <Navigation loginData={loginData} setLoginData={setLoginData}/>
      <Switch>
        <Route path="/minbillet"><MyTickets loginData={loginData}/></Route>
        <Route path="/checkout"><Checkout loginData={loginData} ticketId={ticketId}/></Route>
        <Route path="/billet"><Tickets setTicketId={setTicketId}/></Route>
        <Route path="/camps"><Camps/></Route>
        <Route path="/info"><Info/></Route>
        <Route path="/login"><Login loginData={loginData} setLoginData={setLoginData}/></Route>
        <Route path="/program"><Program loginData={loginData} modalVisible={modalVisible} setModalVisible={setModalVisible}/></Route>
        <Route path="/lineup"><LineUp setModalVisible={setModalVisible}/></Route>
        <Route path="/minside"><MySite loginData={loginData}/></Route>
        <Route path="/"><News setLoginData={setLoginData}/></Route>
      </Switch>
      <FollowUs />
      <Footer validateEmail={validateEmail} modalVisible={modalVisible} setModalVisible={setModalVisible} loginData={loginData}/>
    </Router>
  )
}

export default App;
