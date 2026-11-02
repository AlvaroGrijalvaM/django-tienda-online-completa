import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export function ClientLayout({ children }) {
    return (
        <div className="client-layout">
            <header className="navbar-app">
                <Link to="/" className="navbar-app__brand">
                    <span>🛒 Tienda Online</span>
                </Link>
                <nav className="navbar-app__nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/login">Acceso Clientes / Admin</Link>
                    <Link to="/register">Registro</Link>
                </nav>
            </header>
            <Container className="page-container">
                {children}
            </Container>
        </div>
    );
}

