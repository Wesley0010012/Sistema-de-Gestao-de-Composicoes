import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ListPageTemplate } from "./templates/ListPageTemplate";
import { ListComposersPage } from "./pages/ListComposers/ListComposersPage";
import { ManageComposersPage } from "./pages/ManageComposers/ManageComposersPage";
import ListWorksPage from "./pages/ListWorks/ListWorksPage";
import { ManageWorksPage } from "./pages/ManageWorks/ManageWorksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ListPageTemplate />}>
          <Route path="/composers" element={<ListComposersPage />} />
          <Route path="/composers/create" element={<ManageComposersPage />} />
          <Route
            path="/composers/update/:id"
            element={<ManageComposersPage />}
          />

          <Route path="/works" element={<ListWorksPage />} />

          <Route path="/works/create" element={<ManageWorksPage />} />
          <Route path="/works/update/:id" element={<ManageWorksPage />} />

          <Route path="*" element={<Navigate to="/composers" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
