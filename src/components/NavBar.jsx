import { Link } from 'react-router-dom';
import './CartWidget.jsx';
import './NavBar.css';
import CartWidget from './CartWidget.jsx';

export default function NavBar() {
  return (
    <>
      <header>
        <div className="divTitulo">
          <img
            className="iconoPrincipal"
            src="../src/assets/Iconotyt.jpeg"
            alt="Icono"
          />
          <button className="titulo">
            <h2>
              <Link to={'/'}>TyT-Electronics</Link>
            </h2>
          </button>
        </div>
        <nav>
          <button>
            <Link to={'/category/Auriculares'}>Auriculares</Link>
          </button>
          <button>
            <Link to={'/category/Monitores'}>Monitores</Link>
          </button>
          <button>
            <Link to={'/category/Mouses'}> Mouses</Link>
          </button>
        </nav>
        <CartWidget />
      </header>
    </>
  );
}
