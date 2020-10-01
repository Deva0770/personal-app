import React, { Component } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox'; 

 const customStyle = {
 width: 'auto',
 margin: '0 auto'
 }
 
 class EditCar extends Component {
    constructor(props) {
    super(props);
    var date_val = new Date().toLocaleDateString();
    this.state = {
        fields: {
            carno : '',
            name : '',
            contactno : '',
            servicedetails : '',
            price : '',
            status : '',
            indate : '',
            outdate :date_val
            },
            checkedItems: new Map(),
            servicetype:[]
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount = () => {
        this.getServiceTypeList();
        this.getCarById();
    }

     // To get all the servicetype
     getServiceTypeList() {
        axios.get('http://localhost:4000/autoRepair/servicetype')
        .then((response) => {
            console.log(response);
            const dat = response.data;
            var servicetypearr = new Array();
            {
                dat && dat.map((datas, i) => {
                    servicetypearr[datas.keyname] = datas.price;
                });
            
            }
            this.setState({
                servicetype: servicetypearr
            });
        })
        .catch((error) => {
            console.log(error);
            alert('Error While Fetching a record.. : ' + error)
        })
    }

    // To get Car based on ID
    getCarById() {
        axios.get('http://localhost:4000/autoRepair/editcar/' + this.props.match.params.id)
        .then((response) => {
            this.setState({
                    fields:{
                        carno: response.data.carno,
                        name: response.data.name,
                        contactno: response.data.contactno,
                        servicedetails: response.data.servicedetails,
                        price: response.data.price,
                        status: response.data.status,
                        indate: response.data.indate,
                        outdate: this.state.fields.outdate
                    }
            });

            const servicedetails = this.state.fields.servicedetails;
            var servicedetailsarr = servicedetails.split(',');
           // console.log(servicedetailsarr)
            servicedetailsarr.forEach((val,keys) =>{
               // console.log(val+'--'+keys)
               if(val){
                this.state.checkedItems.set(val,true)
                //this.setState.checkedItems.set(val,true)
                    this.setState(prevState => ({
                        checkedItems: prevState.checkedItems.set(val, true)
                    })); 
               }
               //console.log(this.state.checkedItems)
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    priceCalculation(){
        let fields = this.state.fields;
       // console.log(this.state.checkedItems)
        const servicetype = this.state.servicetype;
       // console.log(servicetype)
       fields['servicedetails'] = "";
        var price = 0;
            this.state.checkedItems.forEach((keys,val) =>{     
                         
                if(servicetype.hasOwnProperty(val)){
                    //console.log(keys + '--'+ val)
                    if(keys){
                        price = price + parseInt(servicetype[val])
                        fields['servicedetails'] = fields['servicedetails'] + ',' + val;   
                    }
                }else{
                    console.log(keys + '--not found'+ val)
                } 
            })
            
           // this.state.fields.price = price;
           // this.setState({fields.price = price});
           fields['price'] = price;
           this.setState({fields});
           // console.log(price)
          
         // this.handleChange(field, event);
    }

    // When value changes of the fields
    handleChange = (field, event) => {
        event.preventDefault();
        //console.log(event.target.value)
        let fields = this.state.fields;
        if(event.target.type === 'checkbox'){
            const item = event.target.name;
            const isChecked = event.target.checked;
            this.setState(prevState => ({
                checkedItems: prevState.checkedItems.set(item, isChecked)
            }));
            //this.state.checkedItems.set()           
            
        }else{
            fields[event.target.name] = event.target.value;     
        }      
        this.setState({fields});
        console.log(this.state.fields)
       // this.setState({ [event.target.name]: event.target.value });
    }
    
    // To add new Dog when user submits the form
    handleSubmit = (event) => {
        event.preventDefault();
       
        this.priceCalculation();
        var process_servicetypes = this.state.fields['servicedetails'] ;
        this.state.fields['servicedetails'] = process_servicetypes.substring(1, process_servicetypes.length);
        const { carno, name, contactno, servicedetails,price,status,indate,outdate } = this.state.fields;
       //console.log(servicedetails);
       console.log(this.state.fields)
       axios.put('http://localhost:4000/autoRepair/updatecar/' + this.props.match.params.id , {
                carno:carno,
                name : name,
                contactno : contactno,
                servicedetails : servicedetails,
                price : price,
                status : status,
                indate : indate,
                outdate :outdate
            })
            .then((response) => {
                console.log(response);
                alert('Car Updated Successfully.!')
                //this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                alert('While Adding a record.. : ' + error)
            });
        
    }
 
    render() {
        const checkboxes = [
            {
                name: "oilchange",
                key: "oilchange",
                label: "Oil Change"
            },
            {
                name: "waterwash",
                key: "waterwash",
                label: "Water Wash"
            },
            {
                name: "detailing",
                key: "detailing",
                label: "Detailing"
            },
            {
                name: "wheelalignment",
                key: "wheelalignment",
                label: "Wheel alignment"
            },
            {
                name: "inspection",
                key: "inspection",
                label: "Inspection"
            },
            {
                name: "mufflersandbrakes",
                key: "mufflersandbrakes",
                label: "Mufflers and Brakes"
            },
        ];

        const checkboxesToRender = checkboxes.map(item => {
            return (
                <label key={item.key}>
                    
                    <Checkbox
                        name={item.name}
                        checked={this.state.checkedItems.get(item.name)}
                        onChange={this.handleChange.bind(this, item.name)}
                        type="checkbox"
                    /> {item.label} &nbsp; &nbsp; &nbsp;
                </label> 
            );
        });

       
        return (
            <div className="row">
                <div className="col-md-12">                    
                    <div className="container">                    
                        <form style={customStyle} onSubmit={this.handleSubmit}>
                            
                            <h3>Car Form</h3>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>
                                    Date
                                        <input 
                                        name="indate"
                                        type="text"
                                        value={this.state.fields.indate}
                                        onChange={this.handleChange.bind(this, "indate")}
                                        className="form-control"  
                                        disabled="disabled"                      
                                        />
                                        
                                    </label>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Car No
                                        <input 
                                        name="carno"
                                        type="text"
                                        value={this.state.fields.carno}
                                        onChange={this.handleChange.bind(this, "carno")}
                                        className="form-control"                        
                                        />
                                        
                                    </label>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Name
                                        <input 
                                        name="name"
                                        type="text"
                                        value={this.state.fields.name}
                                        onChange={this.handleChange.bind(this, "name")}
                                        className="form-control"
                                        />
                                        
                                    </label>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Contact No
                                        <input 
                                        name="contactno"
                                        type="text"
                                        value={this.state.fields.contactno}
                                        onChange={this.handleChange.bind(this, "contactno")}
                                        className="form-control"
                                        />
                                        
                                    </label>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Service Details                                                             
                                    </label>
                                    <br />
                                    {checkboxesToRender}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Status
                                        <select name="status" className="form-control"
                                            value={this.state.fields.status}
                                            onChange={this.handleChange.bind(this, "status")}
                                        >
                                            <option>Please select status</option>
                                            <option value="Intake">Intake</option>
                                            <option value="WorkInProgress">Work In Progress</option>
                                            <option value="PartsPending">Parts Pending</option>
                                            <option value="Readytopickup">Ready to pick up</option>
                                        </select>
                                    
                                        
                                    </label>
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                    onClick={() => this.priceCalculation()}
                                    type="button"
                                    value="Calculate price"
                                    className="btn btn-primary proceed"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label id="pricedetails">
                                        Price : 
                                        <input 
                                        disabled="disabled"
                                        name="price"
                                        type="text"
                                        value={this.state.fields.price}
                                        onChange={this.handleChange.bind(this, "price")}
                                        className="form-control "
                                        />
                                       
                                      
                                    </label>
                                </div>
                            <br />
                            <input                             
                            type="submit"
                            value="submit"
                            className="btn btn-primary formsubmit"
                            />
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }
    
 }
 
 export default EditCar;