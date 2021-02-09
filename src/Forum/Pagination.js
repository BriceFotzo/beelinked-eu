import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import axios from 'axios';
import Lecture from './Lecture'

const env = require('../config');

class PaginationPage extends React.Component {
    state={
        sujet:[],
        current:'',
        size:'4',
        currSujet:[],
        page:''
    }


    async componentDidMount() {
        let res = await axios.get(env.serverPath+':'+env.serverPort+'/sujet/');
        var s =[];
        var sujet = res.data;
        var size = parseInt(this.state.size);
        if(Math.ceil(res.data.length/this.state.size) === 1&& res.data.length % size !==0){
            size = res.data.length % size;
        }
        for (var i = 0;i< size;i++){
            console.log("1",sujet[i]);
            s.push(sujet[i]);
        }  
        this.setState({sujet: res.data, page: Math.ceil(res.data.length/this.state.size),current:'1',currSujet: s},()=>console.log('sujet',this.state));
    }

    clickPreviousHandler = event =>{
        if(parseInt(this.state.current) !== 1){
            var s = [];
            var sujet = this.state.sujet;
            var size = this.state.size;
            var current = parseInt(this.state.current)-1
            for (var i = 0;i< size;i++){
                console.log("1",sujet[i+(size)*(this.state.current-2)]);
                s.push(sujet[i+(size)*(this.state.current-2)]);
            }
            //event.target.parentElement.classList.value = "active page-item";
            this.setState({
                currSujet : s,
                current :current
            },()=>console.log('current page',this.state.current));
        }
    }
    
    clickNextHandler = event =>{
        console.log("1",this.state.current , this.state.page);
        console.log("2",parseInt(this.state.current) !== parseInt(this.state.page));

        if(parseInt(this.state.current) !== parseInt(this.state.page)){
            var s = [];
            var sujet = this.state.sujet;
            var size = parseInt(this.state.size);
            var current = parseInt(this.state.current)+1
            console.log('cc',this.state.sujet.length % size !==0);
            if(current === parseInt(this.state.page) && this.state.sujet.length % size !==0){
                size = this.state.sujet.length % size;
                console.log(size);
            }
            for (var i = 0;i< size;i++){
                console.log("1",sujet[i+parseInt(this.state.size)*this.state.current]);
                s.push(sujet[i+parseInt(this.state.size)*(this.state.current)]);
            }
            //event.target.parentElement.classList.value = "active page-item";
            this.setState({
                currSujet : s,
                current :current
            },()=>console.log('current page',this.state.current));
        }
    }

    clickHandler= event=>{
        var s = [];
        var sujet = this.state.sujet;
        var size = parseInt(this.state.size);
        //console.log(event.target.innerHTML);
        if(parseInt(event.target.innerHTML) === parseInt(this.state.page)&& this.state.sujet.length % size !==0){
            size = this.state.sujet.length % size;
        }
        for (var i = 0;i< size;i++){
            console.log("1",sujet[i+parseInt(this.state.size)*(event.target.innerHTML-1)]);
            s.push(sujet[i+parseInt(this.state.size)*(event.target.innerHTML-1)]);
        }
        //event.target.parentElement.classList.value = "active page-item";
        this.setState({
            currSujet : s,
            current :event.target.innerHTML
        },()=>console.log('current page',this.state.current));
        //console.log("Sa",s);
    }

    render(){ 
        var items = [];
        for (var i = 0; i <Math.ceil(this.state.page) ; i++) {
            items.push(i);  
        }
        return (
            <div>
                <Lecture sujet={this.state.currSujet} />
                <MDBPagination className="mb-5">
                <MDBPageItem onClick={this.clickPreviousHandler} >
                <MDBPageNav aria-label="Previous">
                   <span aria-hidden="true">Previous</span>
                </MDBPageNav>
                </MDBPageItem>
                {items.map((item)=>{
                    return(
                        <MDBPageItem onClick={this.clickHandler} >
                        <MDBPageNav>
                           {item+1} 
                        </MDBPageNav>
                        </MDBPageItem>
                    );
                })}
                <MDBPageItem onClick={this.clickNextHandler}>
                <MDBPageNav aria-label="Previous">
                   <span aria-hidden="true">Next</span>
                </MDBPageNav>
                </MDBPageItem>
                </MDBPagination>
           </div>

          );
    }
  
}

export default PaginationPage;