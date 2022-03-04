import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import Detail from './details';


const Customers = (props) => {

  const user = getCurrentUser();
  
  if (!user) return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
  else
  return (
    <>
      <h2>Customer's details</h2>
      <br />
      <Detail user={user}/>
   </>
 )
}
 
export default Customers;