import Header from "./components/Header";

import {
  Container,
  Row,
  Col,
  Card as BootstrapCard,
  Form,
  Table,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  Search,
  Eye,
  Pencil,
  Trash,
  People,
  PlusCircle,
} from "react-bootstrap-icons";
import { AddButton } from "./components/Buttons/AddButton";
import {
  CardArea,
  type CardPreset,
} from "./components/Dashboard/Card/CardArea";
import { UseNationalitiesContext } from "./contexts/NationalititesContext";
import { UseTotalComposersContext } from "./contexts/TotalComposersContext";
import { UsePeriodsContext } from "./contexts/PeriodsContext";

function App() {
  const { state: nationalities } = UseNationalitiesContext();
  const { state: totalComposers } = UseTotalComposersContext();
  const { state: periods } = UsePeriodsContext();

  const cards: Array<CardPreset> = [
    {
      title: "Total de compositores adicionados",
      value: totalComposers.toString(),
      icon: {
        icon: <People />,
        color: "#0d6efd",
        background: "#e7f1ff",
      },
    },
    {
      title: "Adicionados Recentemente",
      value: "8",
      icon: {
        icon: <PlusCircle />,
        color: "#fd7e14",
        background: "#fff4e6",
      },
    },
  ];

  return (
    <>
      <Header />
      <Container fluid className="p-5 bg-light min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Gestão de compositores</h4>
          </div>

          <AddButton />
        </div>

        <CardArea cards={cards} />

        <BootstrapCard className="p-3 mb-4 shadow-sm border-0">
          <Row className="g-3 align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control placeholder="Digite o nome do compositor..." />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Select>
                <option>Selecione uma nacionalidade</option>
                {nationalities.length > 0 &&
                  nationalities.map((nationality) => (
                    <option id={nationality.id.toString()}>
                      {nationality.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Select>
                <option>Selecione um período</option>
                {periods.length > 0 &&
                  periods.map((period) => (
                    <option id={period.id.toString()}>{period.name}</option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
        </BootstrapCard>

        {/* TABELA */}
        <BootstrapCard className="shadow-sm border-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Birth Date</th>
                <th>Death Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  initials: "WM",
                  name: "Wolfgang Amadeus Mozart",
                  birth: "January 27, 1756",
                  death: "December 5, 1791",
                  color: "#6f42c1",
                },
                {
                  initials: "LB",
                  name: "Ludwig van Beethoven",
                  birth: "December 17, 1770",
                  death: "March 26, 1827",
                  color: "#198754",
                },
                {
                  initials: "JS",
                  name: "Johann Sebastian Bach",
                  birth: "March 31, 1685",
                  death: "July 28, 1750",
                  color: "#fd7e14",
                },
                {
                  initials: "FC",
                  name: "Frédéric Chopin",
                  birth: "March 1, 1810",
                  death: "October 17, 1849",
                  color: "#6f42c1",
                },
                {
                  initials: "PT",
                  name: "Pyotr Ilyich Tchaikovsky",
                  birth: "May 7, 1840",
                  death: "November 6, 1893",
                  color: "#0d6efd",
                },
              ].map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: c.color,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {c.initials}
                      </div>
                      {c.name}
                    </div>
                  </td>
                  <td>{c.birth}</td>
                  <td>{c.death}</td>
                  <td>
                    <Eye className="me-2 text-primary" role="button" />
                    <Pencil className="me-2 text-success" role="button" />
                    <Trash className="text-danger" role="button" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* PAGINAÇÃO */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <small className="text-muted">Showing 1 to 5 of 247 results</small>

            <Pagination className="mb-0">
              <Pagination.Prev />
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Next />
            </Pagination>
          </div>
        </BootstrapCard>
      </Container>
    </>
  );
}

export default App;
