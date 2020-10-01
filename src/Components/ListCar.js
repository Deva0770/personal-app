import React, { Component } from 'react';
 import axios from 'axios';
 import { Table, Button } from 'react-bootstrap';
 // To use routing functionalities
 import { Link } from 'react-router-dom';
 import '../index.css';
 import DeleteCar from './DeleteCar';
 
 var divStyle = {
 margin: '8% 8%',
 };
 
 class ListCar extends Component {
 
    constructor(props) {
        super(props);
        this.DeleteCar = new DeleteCar();
        this.state = {
            cars: []
        }
        this.deleteCarDetails = this.deleteCarDetails.bind(this);
    }
 
    componentDidMount = () => {
        this.getCarsList();
    }
 
    // To get all the cars
    getCarsList() {
        axios.get('http://localhost:4000/autoRepair')
        .then((response) => {
            console.log(response);
            this.setState({
                cars: response.data
            });
        })
        .catch((error) => {
            console.log(error);
            alert('Error While Fetching a record.. : ' + error)
        })
    }
 
    deleteCarDetails(id) {
        if (window.confirm('Are you sure?')) {
            this.DeleteCar.deleteCarDetails(id);
                } else {
            console.log('Delete action cancelled.!');
        }
        
    }
 
    render() {
        const { cars } = this.state;
        return (
            <div style={divStyle}>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Car No</th>
                        <th>Name</th>
                        <th>Contact No</th>
                        <th>Service List</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>In-Date</th>
                        <th>Out-Date</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        cars && cars.map((car, i) => {
                            return (
                                <tr key={i}>
                                <td>{i}</td>
                                <td>{car.carno}</td>
                                <td>{car.name}</td>
                                <td>{car.contactno}</td>
                                <td>{car.servicedetails}</td>
                                <td>{car.status}</td>
                                <td>{car.price}</td>
                                <td>{car.indate}</td>
                                <td>{car.outdate}</td>
                                <td>
                                    <Link to={"editcar/" + car._id} className="btn btn-primary">Edit</Link>
                                </td>
                                <td>
                                    <Button onClick={() => this.deleteCarDetails(car._id)} className="btn btn-danger" >Delete</Button>
                                </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </div>
        );
    } 
 }
 
 export default ListCar;