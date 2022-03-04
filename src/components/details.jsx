import React from 'react';

const Detail = ({user}) => {
     const { _id, name, email } = user;
    return ( <>
        <h4><strong>UserID: </strong>{_id}</h4>
        <h4><strong>Name: </strong>{name}</h4>
        <h4><strong>Email: </strong>{email}</h4>
    </>
      
     );
}
 
export default Detail;