import React, { useState, useEffect } from "react";
import "./PlansScreen.css";
import db from "../firebase";
function PlansScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {}, []);
  return <div className="plansScreen"></div>;
}

export default PlansScreen;
