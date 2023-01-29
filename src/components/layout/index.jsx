import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { comps } from "../../data";
import { Comp } from "../comp";
import down from "../../assets/down.svg";
import up from "../../assets/up.svg";
import "./index.css";

const Layout = () => {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState();
  const [target, setTarget] = useState();
  const position = useRef(-1);
  const [selected, setSelected] = useState(-1);
  const navigate = useNavigate();

  const onDragStart = (comp) => () => {
    setSource(comp);
  };

  const onDragEnd = () => () => {
    setSource(null);
    setTarget(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (position.current >= 0) {
      const newItems = [...items];
      newItems.splice(position.current, 0, JSON.parse(JSON.stringify(target)));
      setItems(newItems);
      setSelected(position.current);
    } else {
      setItems([...items, JSON.parse(JSON.stringify(target))]);
      setSelected(items.length);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (isNaN(parseInt(e.target.getAttribute("data-id")))) {
      position.current = -1;
    } else {
      position.current = parseInt(e.target.getAttribute("data-id"));
    }

    setTarget(source);
  };

  const onDragLeave = () => {
    setTarget(null);
    position.current = -1;
  };

  const onSelected = (id) => () => {
    setSelected(id);
  };

  const handleDown = (index) => (e) => {
    e.stopPropagation();
    if (index === items.length - 1) return;
    const newItems = [...items];
    const item = newItems[index];
    newItems.splice(index, 1);
    newItems.splice(index + 1, 0, item);
    setItems(newItems);
    setSelected(index + 1);
  };

  const handleUp = (index) => (e) => {
    e.stopPropagation();
    if (index === 0) return;
    const newItems = [...items];
    const item = newItems[index];
    newItems.splice(index, 1);
    newItems.splice(index - 1, 0, item);
    setItems(newItems);
    setSelected(index - 1);
  };

  const handleDelete = (index) => (e) => {
    e.stopPropagation();
    const newItems = [...items];
    newItems.splice(index, 1);
    if(newItems.length && index===0){
      setSelected(0)
    }else{
      setSelected(index - 1);
    }
    setItems(newItems);
  };

  const onSave = () => {
    window.localStorage.setItem("comps", JSON.stringify(items));
  };

  const onPreview = () => {
    onSave();
    navigate("/preview");
  };


  useEffect(() => {
    const rawData = window.localStorage.getItem("comps");
    if(rawData){
      try {
        setItems(JSON.parse(rawData));
      } catch (e) {
        console.warn("数据解析失败");
      }
    }
   
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
              data-id={index}
              className={`box ${selected === index ? "active" : ""}`}
            >
              <div className="action">
                <div
                  className={`btn ${index === 0 ? "disabled" : ""}`}
                  onClick={handleUp(index)}
                >
                  <img src={up} />
                </div>
                <div
                  className={`btn ${
                    index === items.length - 1 ? "disabled" : ""
                  }`}
                  onClick={handleDown(index)}
                >
                  <img src={down} />
                </div>
                <div className="btn" onClick={handleDelete(index)}>
                  删除
                </div>
              </div>
              <Comp data={item} />
            </div>
          );
        })}
      </div>
      <div className="right">
        {selected>=0 && items[selected].props.map((prop, index) => {
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
