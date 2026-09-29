import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TreeniList from './pages/TreeniList';
import TreeniDetail from './pages/TreeniDetail';
import TreeniCreate from './pages/TreeniCreate';
import TreeniEdit from './pages/TreeniEdit';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TreeniList />} />
          <Route path="treenit/uusi" element={<TreeniCreate />} />
          <Route path="treenit/:id" element={<TreeniDetail />} />
          <Route path="treenit/:id/muokkaa" element={<TreeniEdit />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}