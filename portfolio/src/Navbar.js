export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/"/>
      <ul className="container nav-styles">
        <div className="logo">
          <a href="/">
            <img src={require("./sticker.png")} alt="Emoji of me" height={150}/>
          </a>
        </div>
        <div className="nav-items thickOutlined item-spacing">
          <a className="nav-items" href="/work">WORK</a>
        </div>
        <div className="nav-items thickOutlined item-spacing">
          <a className="nav-items" href="/me">ME</a>
        </div>
        <div className="nav-items thickOutlined item-spacing">
          <a className="nav-items" href="https://logically.webflow.io/">PLAY</a>
        </div>
        <div className="nav-items thickOutlined item-spacing">
          <a className="nav-items" href="mailto:omotarita@gmail.com?subject=I saw your portfolio and I wanna know you">
            CHAT
          </a>
        </div>
      </ul>
    </nav>
  );
}
