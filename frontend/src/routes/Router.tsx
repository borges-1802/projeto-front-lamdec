import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Home from "../pages/Home";
import TesteApi from "../TesteApi";
import CdaSearch from "../pages/cdaSearch";
import Dash2 from "../pages/claudeDash";

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%);
`;

const PageContainer = styled.div`
  padding-top: 0;
`;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teste" element={<TesteApi />} />
            <Route path="/cda" element={<CdaSearch />} />
            <Route path="/dash" element={<Dash2 />} />
          </Routes>
        </PageContainer>
      </AppContainer>
    </BrowserRouter>
  );
}