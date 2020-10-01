import React, { Component } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox'; 

 const customStyle = {
 width: 'auto',
 margin: '2.5% auto'
 }
 
 class AddCarservice extends Component {
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
            indate : date_val,
            outdate :''
            },
            checkedItems: new Map(),
            servicetype:[]
        };
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    componentDidMount = () => {
        this.getServiceTypeList();
    }

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
    
    handleChange = (field, event) => {
        let fields = this.state.fields;
       if(event.target.type === undefined){

       }else{
        if(event.target.type === 'checkbox'){
            const item = event.target.name;
            const isChecked = event.target.checked;
            this.setState(prevState => ({
                checkedItems: prevState.checkedItems.set(item, isChecked)
            }));
           
        }else{
            fields[event.target.name] = event.target.value;     
        }
         }
        this.setState({fields});
    }
    
   

    priceCalculation(){
        let fields = this.state.fields;
        const servicetype = this.state.servicetype;
       fields['servicedetails'] = "";
        var price = 0;
            this.state.checkedItems.forEach((keys,val) =>{     
                         
                if(servicetype.hasOwnProperty(val)){
                    if(keys){
                        price = price + parseInt(servicetype[val])
                        fields['servicedetails'] = fields['servicedetails'] + ',' + val;
                    }
                }else{
                    console.log(keys + '--not found'+ val)
                } 
            })
            
           fields['price'] = price;
           this.setState({fields});
          
    }
   

    handleSubmit = (event) => {
        event.preventDefault();
            this.priceCalculation();
            var process_servicetypes = this.state.fields['servicedetails'] ;
            this.state.fields['servicedetails'] = process_servicetypes.substring(1, process_servicetypes.length);
            const { carno, name, contactno, servicedetails,price,status,indate,outdate } = this.state.fields;
           //console.log(servicedetails);
                
            axios.post('http://localhost:4000/autoRepair/carservice', {
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
                alert('Car Added Successfully.!')
                this.props.history.push('/');
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
 
 export default AddCarservice;