import { useState, type FormEvent } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { BoxArrowInRight, ShieldLock } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { login, saveToken } from "../../utils/auth/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await login(email, password);
      saveToken(token);
      navigate("/admin/composers");
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="login-page bg-light min-vh-100">
      <Card className="login-card border-0 shadow-sm">
        <Card.Body className="login-card-body">
          <div className="login-icon mb-2">
            <ShieldLock size={22} />
          </div>

          <h1 className="h5 fw-bold mb-1">Acesso administrativo</h1>
          <p className="text-muted small mb-3">
            Entre para gerenciar compositores e obras.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="d-grid gap-2">
            <Form.Group controlId="login-email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="login-password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="d-flex align-items-center justify-content-center gap-2 mt-1"
            >
              <BoxArrowInRight />
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
