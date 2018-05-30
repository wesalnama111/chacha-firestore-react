import React, { Component } from 'react';
import constants from '../includes/Constants';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBX6RS658AMvszuyDJipNv2rylTauUmnC8",
    authDomain: "react-5207d.firebaseapp.com",
    databaseURL: "https://react-5207d.firebaseio.com",
    projectId: "react-5207d",
    storageBucket: "react-5207d.appspot.com",
    messagingSenderId: "41094144902"
};
firebase.initializeApp(config);

var firestore=firebase.firestore();
const CredentialsContext=React.createContext();

class  CredentialsProvider extends Component {
    state = {
        password: '',
        admin: '',
        note: '',
        screen: 1,
        baseprice:null,
        inStock:false,
        salePrice:null,
        title:'',
        uniqueProperty:''
         }
    render(){
        return(
            <CredentialsContext.Provider value = {{
                state: this.state,
                addAdmin: (val) => {
                   console.log(val);
                    this.setState({ admin: val });
                },
                addPassword: (val) => {
                    this.setState({ password: val });
                },
                checkadmin: () => {
                    if (this.state.admin === constants.credentials.referral && this.state.password === constants.credentials.password) {
                        this.setState({screen: 2})
                    }
                },
                groupedproducts: ()=>{
                        this.setState({screen: 3});
                        console.log('groupedProducts');
                },
                singleProduct:()=>{
                    this.setState({screen:4});
                    console.log('singelproducts');
                },
                producttitle:(val)=>{
                    this.setState({title:val });
                    console.log(val);
                },
                inStock:(val)=>{
                    this.setState({inStock:val});
                    console.log(val);
                },
                basePrice:(val)=>{
                    this.setState({baseprice:val});
                },
                salePrice:(val)=>{
                    this.setState({salePrice:val});
                },
                uniqueProperty:(val)=>{
                    this.setState({uniqueProperty:val});
                },
                savegroupeddata:()=>{
                    const docRef=firestore.doc("groupeddata/cocacola");
                    docRef.set({
                        basePrice:this.state.baseprice,
                        inStock:this.state.inStock,
                        saleprice:this.state.salePrice,
                        title:this.state.title,

                    })
                        .then(function(){
                           console.log('values saved')
                        }).catch(function(error){
                        console.log('value not saved error:',error);

                    })

                    this.setState({screen:1});
                },
                savesingeldata:()=>{

                    const docRef=firestore.doc("singleproduct/cocacola");
                    docRef.set({
                        basePrice:this.state.baseprice,
                        inStock:this.state.inStock,
                        saleprice:this.state.salePrice,
                        title:this.state.title,
                        uniqueProperty:this.state.uniqueProperty
                    })
                        .then(function(){

                            console.log('valued-saved')
                        }).catch(function(error){
                        console.log('value not saved error:',error);

                    })
                    this.setState({screen:1});
                },






            }}>
                {this.props.children}
            </CredentialsContext.Provider>
        )
    }
}
const Referral = (props) => (
    <div className="referralMain">
        <CredentialsContext.Consumer>
            {
                (context) => {
                    
                    if(context.state.screen === 1) {
                        return(
                            <React.Fragment>
                                <input type="text" className="InputElement" placeholder="Admin Name" onChange={ (event) => context.addAdmin(event.target.value)} key={'adminnameinput'+context.state.screen}/><br/>
                                <input type="password" className="InputElement" placeholder="Admin Password" onChange={ (event) => context.addPassword(event.target.value)} key={'passwordinput'+context.state.screen}/><br/>
                                <button className="Button" onClick={() => context.checkadmin()} key={'btn' + context.state.screen}>Enter</button>
                            </React.Fragment>
                        )

                    }
                    else if(context.state.screen === 2) {
                        return(
                            <React.Fragment>
                                <button className="Button" key={'btn' + context.state.screen} onClick={context.groupedproducts}>GroupedProducts</button>
                                <button className="Button" key={'btn2' + context.state.screen} onClick={context.singleProduct}>SingleProduct</button>
                         :   </React.Fragment>
                        )
                    }
                    else if(context.state.screen===3){
                        return (
                            <React.Fragment>
                                <input className="InputElement" type="text" onChange={(event)=>context.producttitle(event.target.value)} placeholder="Product Title"/>
                                <input className="InputElement" type="boolean" onChange={(event)=>context.inStock(event.target.value)} placeholder="In Stock"/>
                                <input className="InputElement" type="number" onChange={(event)=>context.basePrice(event.target.value)} placeholder="Base Price"/>
                                <input className="InputElement" type="number" onChange={(event)=>context.salePrice(event.target.value)} placeholder="Sale Price"/>
                                <input className="InputElement" type="text" onChange={(event)=>context.uniqueProperty(event.target.value)} placeholder="unique Property"/>
                                <input className="Button" type="button" value="Save" onClick={context.savegroupeddata}/>
                            </React.Fragment>

                        )
                    }
                    else if(context.state.screen ===4){
                        return(
                            <React.Fragment>
                                <input className="InputElement" type="text" onChange={(event)=>context.producttitle(event.target.value)} placeholder="Product Title"/>
                                <input className="InputElement" type="boolean" onChange={(event)=>context.inStock(event.target.value)} placeholder="In Stock"/>
                                <input className="InputElement" type="number" onChange={(event)=>context.basePrice(event.target.value)} placeholder="Base Price"/>
                                <input className="InputElement" type="number" onChange={(event)=>context.salePrice(event.target.value)} placeholder="Sale Price"/>
                                <input className="Button" type="button" value="Save" onClick={context.savesingeldata}/>
                            </React.Fragment>
                        )
                    }
                }
            }
        </CredentialsContext.Consumer>
    </div>
);

class MainWork extends Component {
  render() {
    return (
        <CredentialsProvider>
            <div className="App">
                <div className="Box">

          <h3 className="content">Cha Cha Admin</h3>

         <br/>
                  
                    <Referral />
                </div>
            </div>
        </CredentialsProvider>
    );
  }
}

export default MainWork;
