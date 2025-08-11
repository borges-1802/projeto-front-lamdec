import { useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import logo from "../../assets/lamdec-logo.png";
import {HeaderContainer, HeaderContent, Logo, LogoSection, Title, SearchTab, MobileMenuButton} from "./styles";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/dash');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={handleLogoClick}>
          <Logo src={logo} alt="LAMDEC Logo" />
          <Title>Projeto LAMDEC</Title>
        </LogoSection>

        <SearchTab onClick={handleSearchClick}>
          <Search size={18} />
          <span>Pesquisa</span>
        </SearchTab>

        <MobileMenuButton aria-label="Menu">
          <Menu size={24} />
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
