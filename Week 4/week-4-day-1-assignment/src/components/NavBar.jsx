const NavBar = ({ brand, links }) => {
    return (
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px" }}>
        <span style={{ fontWeight: "bold" }}>{brand}</span>
        <div style={{ display: "flex", gap: "16px" }}>
          {links.map(({ label, href }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </nav>
    );
  };
  
  export default NavBar;