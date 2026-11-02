import { useAuth } from "../hooks/useAuth";
import { Login } from "../pages/common";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export function AdminLayout({ children }) {
    const { auth, logout } = useAuth();

    if (!auth) {
        return <Login />;
    }

    return (
        <div className="admin-layout">
            <header className="navbar-app">
                <Link to="/dashboard" className="navbar-app__brand">
                    <span>🛒 Tienda Online</span>
                    <span className="badge">Admin</span>
                </Link>
                <div className="navbar-app__user">
                    <span>Usuario: <strong>{auth.me?.email || auth.me?.username}</strong></span>
                    <Button
                        size="tiny"
                        color="red"
                        basic
                        inverted
                        onClick={logout}
                        content="Cerrar Sesión"
                    />
                </div>
            </header>
            <Container className="page-container">
                {children}
            </Container>
        </div>
    );
}

