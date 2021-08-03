import React from 'react';
import { Link } from 'react-router-dom';
  
function PageNotFound(){
  
  return (
    <div className="center">
      <img src="https://artsfuse.org/wp/wp-content/uploads/2021/06/dirty-harry-1971-clint-eastwood-do-you-punk-hd-review-1.jpg" alt="Page non trouvée"/>
      <h1>Hey, cette page n'existe pas !</h1> 
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Retourner à l'accueil
      </Link>
    </div>
  );
}
  
export default PageNotFound;