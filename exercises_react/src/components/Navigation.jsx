import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create a exercise</Link>
      
    </nav>
  );
}

export default Navigation;