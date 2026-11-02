import React from "react";
import { Header, Button, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export function Error404() {
    const navigate = useNavigate();
    return (
        <Container textAlign="center" style={{ marginTop: "100px" }}>
            <Header as="h1" size="huge">Error 404</Header>
            <p>Página no encontrada</p>
            <Button primary onClick={() => navigate("/")}>Volver al Inicio</Button>
        </Container>
    );
}
