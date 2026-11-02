import { Header, Button, Segment, Grid, List } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <Segment basic style={{ padding: "32px 0 24px 0", textAlign: "center" }}>
                <Header as="h1" style={{ fontSize: "28px", color: "#0f172a", marginBottom: "12px" }}>
                    Catálogo de Productos y Servicios
                </Header>
                <p style={{ fontSize: "16px", color: "#475569", maxWidth: "600px", margin: "0 auto 24px auto" }}>
                    Plataforma de tienda en linea desarrollada con Django en el backend y React en el frontend. Accede al panel para gestionar productos y consultar servicios web.
                </p>
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "12px" }}>
                    <Button primary onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </Button>
                    <Button basic onClick={() => navigate("/register")}>
                        Crear una Cuenta
                    </Button>
                </div>
            </Segment>

            <Grid columns={2} stackable style={{ marginTop: "16px" }}>
                <Grid.Column>
                    <Segment>
                        <Header as="h4">Características del Sistema</Header>
                        <List bulleted>
                            <List.Item>Autenticación segura con JSON Web Tokens (JWT)</List.Item>
                            <List.Item>Documentación de API interactiva con Swagger</List.Item>
                            <List.Item>Gestión de productos y categorías con descuentos estratégicos</List.Item>
                            <List.Item>Consumo de servicios SOAP con Zeep en el Backend</List.Item>
                        </List>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment>
                        <Header as="h4">Acceso Rápido</Header>
                        <p style={{ color: "#64748b", fontSize: "14px" }}>
                            Inicia sesión como administrador o cliente para ver los módulos protegidos y el widget de API externa.
                        </p>
                        <Button color="blue" onClick={() => navigate("/login")}>
                            Ir al Portal de Acceso
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
}


