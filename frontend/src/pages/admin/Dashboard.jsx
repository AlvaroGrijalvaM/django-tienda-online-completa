import { useState, useEffect } from "react";
import { Header, Message, Icon, Button, Divider, Segment } from "semantic-ui-react";
import { useAuth } from "../../hooks/useAuth";

export function Dashboard() {
    const { auth } = useAuth();
    const [quote, setQuote] = useState(null);
    const [soapData, setSoapData] = useState(null);
    const [loadingSoap, setLoadingSoap] = useState(false);

    // Consumo de API de terceros gratuita (Frases positivas en español)
    useEffect(() => {
        fetch("https://www.positive-api.online/phrase/esp")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.text) {
                    setQuote({
                        content: data.text,
                        author: "Positive API (Español)",
                    });
                }
            })
            .catch(() => {
                setQuote({
                    content: "Me acepto con mis luces y mis sombras.",
                    author: "Positive API (Español)",
                });
            });
    }, []);


    // Consulta del servicio web SOAP desde Django
    const handleCheckSoap = async () => {
        setLoadingSoap(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/soap/currency/", {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const data = await res.json();
            setSoapData(data);
        } catch {
            setSoapData({ status: "error", message: "No se pudo conectar con el endpoint SOAP del backend" });
        } finally {
            setLoadingSoap(false);
        }
    };

    return (
        <div>
            <Header as="h2">
                Panel de Administración
                <Header.Subheader>
                    Gestión de tienda online y servicios integrados
                </Header.Subheader>
            </Header>

            <Message info>
                <Message.Header>Sesión iniciada con éxito</Message.Header>
                <p>
                    Bienvenido, <strong>{auth?.me?.email || auth?.me?.username}</strong>. Autenticado mediante JWT.
                </p>
            </Message>

            <Divider style={{ margin: "28px 0" }} />

            {/* Widget de API de Terceros */}
            <Header as="h4">
                <Icon name="quote left" /> Cita del Día (API de Terceros)
            </Header>
            <Segment secondary>
                <p style={{ fontSize: "15px", fontStyle: "italic", margin: "4px 0" }}>
                    "{quote?.content || "Cargando cita..."}"
                </p>
                <small style={{ color: "#64748b" }}>— {quote?.author || "Desconocido"}</small>
            </Segment>

            <Divider style={{ margin: "28px 0" }} />

            {/* Verificación de Web Service SOAP */}
            <Header as="h4">
                <Icon name="server" /> Integración Web Service SOAP (Django + Zeep)
            </Header>
            <p style={{ color: "#475569", fontSize: "14px" }}>
                Consume el servicio SOAP público de cálculo/servicios a través del backend.
            </p>
            <div style={{ marginTop: "16px" }}>
                <Button
                    primary
                    size="small"
                    loading={loadingSoap}
                    onClick={handleCheckSoap}
                    content="Consultar Servicio SOAP"
                />
            </div>


            {soapData && (
                <Segment tertiary style={{ marginTop: "16px" }}>
                    <pre style={{ margin: 0, fontSize: "13px" }}>
                        {JSON.stringify(soapData, null, 2)}
                    </pre>
                </Segment>
            )}
        </div>
    );
}

