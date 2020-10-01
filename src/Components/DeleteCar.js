import axios from 'axios';
 
 class DeleteCar {
     deleteCarDetails(id) {
        axios.delete('http://localhost:4000/autoRepair/deletecar/' + id)
        .then(() => {
            console.log('Car Deleted !!!')
            alert('Car Deleted !!!')
           // this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error)
            alert('Error While Fetching a record.. : ' + error)
        })
    }
 }
 
 export default DeleteCar;