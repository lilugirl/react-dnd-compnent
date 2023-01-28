import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { comps } from "../../data";
import { Comp } from "../comp";
import "./index.css";

const Layout = () => {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const [selected, setSelected] = useState(-1);
  const navigate = useNavigate();

  const onDragStart = (comp) => (e) => {
    setSource(comp);
  };

  const onDragEnd = (comp) => (e) => {
    setSource(null);
    setTarget(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setItems([...items, JSON.parse(JSON.stringify(target))]);
    setSelected(items.length);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setTarget(source);
  };

  const onDragLeave = (e) => {
    setTarget(null);
  };

  const onSelected = (id) => (e) => {
    setSelected(id);
  };

  const onSave = () => {
    window.localStorage.setItem("comps", JSON.stringify(items));
  };

  const onPreview = () => {
    navigate("/preview");
  };

  useEffect(() => {
    window.localStorage.removeItem("comps");
  }, []);

  return (
    <div className="layout">
      <div className="left">
        {comps.map((comp, index) => {
          return (
            <div
              className="box"
              key={index}
              draggable
              onDragStart={onDragStart(comp)}
              onDragEnd={onDragEnd(comp)}
            >
              {comp.label}
            </div>
          );
        })}
      </div>
      <div
        className="content"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              onClick={onSelected(index)}
              className={`box ${selected === index ? "active" : ""}`}
            >
              <Comp data={item} />
            </div>
          );
        })}
      </div>
      <div className="right">
        {selected >= 0 &&
          items[selected].props.map((prop, index) => {
            return (
              <div key={index}>
                {prop.label}
                <input
                  key={Math.random()}
                  defaultValue={prop.value}
                  onBlur={() => {
                    setItems([...items]);
                  }}
                  onChange={(e) => {
                    prop.value = e.target.value;
                  }}
                />
              </div>
            );
          })}
        <br />
        <button onClick={onSave}>保存</button>{" "}
        <button onClick={onPreview}>预览</button>
        <br />
        {JSON.stringify(items)}
      </div>
    </div>
  );
};
export default Layout;
