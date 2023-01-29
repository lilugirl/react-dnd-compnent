import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comp } from "../comp";
import "./index.css";

const Preview = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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
    <div className="preview">
      {items.map((item, index) => {
        return <Comp data={item} key={index} />;
      })}

      <button onClick={() => navigate("/")}>返回</button>
    </div>
  );
};

export default Preview;
