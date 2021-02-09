import React, { Component, useState, useEffect } from 'react'


import { MDBDataTable } from 'mdbreact';
import { Modal, Table } from 'react-bootstrap';
import Foots from '../../Home/Foots';
import BeeNav from '../../Home/navbar'
import Axios from 'axios';
import * as ReactBootStrap from "react-bootstrap"

const HomeAllAlertes = () => {


    
    const [dataList, setDataList] = useState([]);

   

    let userCo = JSON.parse(localStorage.getItem('userCo'))



    

         useEffect(() => {
            Axios.post('http://localhost:3000/getalerts', { "idUser": userCo.id }).then((result) => {
              // console.log(result.data);
              //console.log(idUser)
              setDataList(result.data)
            });
        }, [])

            console.log("liste", dataList)
          



            const render =(player, index) =>{
                return(
                    <tr key={index}>
                        <td>{player.Date.split("T")[0]+ " " +(player.Date.split("T", 5)[1]).split(":00.000Z")[0]}</td>
                        <td>{player.Message}</td>
                        <td>{player.City}</td>
                    </tr>
                )
            }



    

    return (


        <div>
            <header className="App-header" style={{ height: 100, maxHeight: '100', overflowY: 'auto' }}>
                <BeeNav connected={userCo.Statut} />
            </header>

            <div style={{ width: 1000, height: 1000, marginLeft: "auto", marginRight: "auto", overflowY: 'auto' }}>
               <ReactBootStrap.Table class="table table-bordered">
                   <thead  class="thead-light">
                       <tr>
                           <th >Date</th>
                           <th>Message</th>
                           <th>City</th>
                       </tr>
                   </thead>
                   <tbody>
                       {dataList.map(render)}
                   </tbody>
               </ReactBootStrap.Table>


            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <footer style={{ height: 100, maxHeight: '100', overflowY: 'auto' }}>
                <Foots />
            </footer>
        </div >
    );
}



export default HomeAllAlertes;

