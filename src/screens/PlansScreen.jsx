import React, { useState, useEffect } from "react";
import "./PlansScreen.css";
import db from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
} from "firebase/firestore/lite";
import { onSnapshot } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
function PlansScreen() {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    const productsRef = query(
      collection(db, "products"),
      where("active", "==", true)
    );
    getDocs(productsRef).then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    console.log(priceId);
    const docRef = await addDoc(
      collection(
        doc(collection(db, "customers"), user.uid),
        "checkout_sessions"
      ),
      {
        prices: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        //there exists a session ID so lets go to checkout.
        //Init stripe
        const stripe = await loadStripe(
          "pk_test_51LwMfCBeaUK7K2lAX9Kzkz5halyfAv8vRNlYFwzLbxUEm5IBTm3vgtB8WyyhfVcgFktd75F501Vaskzkq3zeqMSy00EFogh5cL"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //check if users subscription is active
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
              <h3>{"1"}</h3>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
