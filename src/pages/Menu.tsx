import "./Menu.less";
import { useEffect, useRef, useState } from "react"
import { gameManager } from "../core/GameManager";

export function Menu() {
  const [login, setLogin] = useState(false);
  const [menu12, setMenu12] = useState(false);
  const [doorCreate, setDoorCreate] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);

  useEffect(() => {
    gameManager.on("doorCreate", () => {
      setDoorCreate(true)
    }, true, true);
    gameManager.on("openDoor", () => {
      setOpenDoor(true)
      setMenu12(false)
    }, true, true);
    setTimeout(() => {
      setLogin(true);
      setMenu12(true)
    }, 500);
  }, [])

  return (
    <div className="menu-container">
      <div className="menu-12" style={{ opacity: menu12 ? "0.9" : "0" }}></div>
      <div className="menu-login" style={{ opacity: login ? "1" : "0" }}>
        <div className="background"></div>
        <div className="menu-description">
          <div className="description">
          <p>使用说明：点击右下角的门进行———原神，启动！ .</p>
           <p>免责声明：本项目仅为WebGL技术展示，详情按箭头图标，或查看源代码。</p>
          </div>
        </div>
        <button className="ClickMe" onClick={login ? () => {
          gameManager.emit("button-start-click");
          gameManager.emit("start")
          setLogin(false)
        } : () => { }}></button>
        <button className="ClickMe" style={{
          bottom: "16%",
          backgroundImage: `url("/Genshin/jump.png")`
        }} onClick={login ? () => {
          window.open('https://github.com/Titlecan/Genshin-Start');
        } : () => { }}></button>
      </div>
      {doorCreate && (
        <div className="menu-doorCreate-content" style={{ opacity: openDoor ? "0" : "1" }}>
          <div className="menu-doorCreate" >
            <div className="entry" />
          </div>
        </div>
      )}

    </div>
  )
}
