import React from 'react';
import notfound from '../not-found.png';

//page not found
const NotFound = () => (
    <div className="not-found">
        <img src={notfound} alt="page not found" />
        <h3>Page not found</h3>
    </div>
  );
  
  export default NotFound;