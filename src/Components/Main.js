import React, { Component } from 'react';
 import { Switch, Route } from 'react-router-dom';
 
 // Our all component files
 import ListCar from './ListCar';
 import AddCar from './AddCarservice';
 import EditCar from './EditCar';
 
 class Main extends Component {
     render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ListCar} />
                    <Route path='/list' component={ListCar} /> 
                    <Route path='/addcarservice' component={AddCar} />
                    <Route path='/editcar/:id' component={EditCar} />
                </Switch>
            </main>
        );
    }
 }

export default Main;