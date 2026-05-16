import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { ScoresOnlyPwaRedirect } from "./components/Pwa/ScoresOnlyPwaRedirect";
import { ListPageTemplate } from "./templates/ListPageTemplate";
import { ListComposersPage } from "./pages/ListComposers/ListComposersPage";
import { ManageComposersPage } from "./pages/ManageComposers/ManageComposersPage";
import ListWorksPage from "./pages/ListWorks/ListWorksPage";
import { ManageWorksPage } from "./pages/ManageWorks/ManageWorksPage";
import { MusicianScoresPage } from "./pages/MusicianScores/MusicianScoresPage";
import { LoginPage } from "./pages/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <ScoresOnlyPwaRedirect />
      <Routes>
        <Route element={<ListPageTemplate />}>
          <Route path="/" element={<MusicianScoresPage />} />
          <Route path="/partituras" element={<Navigate to="/" replace />} />
          <Route path="/admin/login" element={<LoginPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Navigate to="/admin/composers" replace />} />
            <Route path="/admin/composers" element={<ListComposersPage />} />
            <Route path="/admin/composers/create" element={<ManageComposersPage />} />
            <Route
              path="/admin/composers/update/:id"
              element={<ManageComposersPage />}
            />

            <Route path="/admin/works" element={<ListWorksPage />} />

            <Route path="/admin/works/create" element={<ManageWorksPage />} />
            <Route path="/admin/works/update/:id" element={<ManageWorksPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
