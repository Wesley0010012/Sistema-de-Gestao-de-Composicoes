import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Accordion,
  Table,
  InputGroup,
} from "react-bootstrap";

import { Plus, Search, Upload, Trash, Eye } from "react-bootstrap-icons";
import Header from "./components/Header";
import { useWorksPageContext } from "./contexts/WorksPageContext";
import { useSearchBarContext } from "./contexts/SeachBarContext";

export default function App() {
  const { state } = useWorksPageContext();
  const { state: search, setState: setSearch } = useSearchBarContext();

  const works = state.data;

  return (
    <>
      <Header />

      <Container fluid className="p-4 bg-light min-vh-100">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Gestão de Obras</h4>
          </div>

          <Button style={{ backgroundColor: "#7c3aed", border: "none" }}>
            <Plus className="me-2" />
            Cadastrar!
          </Button>
        </div>

        {/* FILTERS */}
        <Card className="p-3 mb-4 shadow-sm border-0">
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Digite o nome da obra..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Select>
                <option>Todos os gêneros</option>
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Select>
                <option>Todos os compositores</option>
              </Form.Select>
            </Col>
          </Row>
        </Card>

        {/* WORKS LIST */}
        <Accordion>
          {works.map((work, index) => (
            <Accordion.Item eventKey={index.toString()} key={work.id}>
              {/* WORK HEADER */}
              <Accordion.Header>
                <div className="d-flex flex-column">
                  <strong>{work.title}</strong>

                  <small className="text-muted">
                    Ano: {work.yearComposition}
                  </small>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                {/* ACTIONS WORK */}
                <div className="d-flex justify-content-end mb-3">
                  <Button size="sm" variant="outline-primary" className="me-2">
                    <Plus className="me-1" />
                    Incluir sessão
                  </Button>
                </div>

                {/* SECTIONS */}
                {work.sections.map((section) => (
                  <Card
                    key={section.id}
                    className="mb-3 p-3 border-0 shadow-sm"
                  >
                    {/* SECTION HEADER */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <strong>Seção</strong>

                        <div className="text-muted small">
                          Key: {section.key.root} {section.key.mode}
                        </div>
                      </div>

                      <Button size="sm" variant="outline-success">
                        <Upload className="me-1" />
                        Carregar partitura
                      </Button>
                    </div>

                    {/* SCORES TABLE */}
                    <Table hover responsive size="sm" className="mb-0">
                      <thead>
                        <tr>
                          <th>Instrumento</th>
                          <th>Registro</th>
                          <th>Ações</th>
                        </tr>
                      </thead>

                      <tbody>
                        {section.scores.map((score) => (
                          <tr key={score.id}>
                            <td>{score.instrument.name}</td>
                            <td>{score.path}</td>

                            <td>
                              <Eye
                                className="me-2 text-primary"
                                role="button"
                              />

                              <Trash className="text-danger" role="button" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
