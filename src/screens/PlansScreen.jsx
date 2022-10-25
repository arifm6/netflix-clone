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
  onSnapshot,
} from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
function PlansScreen() {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "customers", user.uid, "subscriptions")).then(
      (querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_start:
              subscription.data().current_period_start.seconds,
            current_period_end: subscription.data().current_period_end.seconds,
          });
        });
      }
    );
  }, [user.uid]);
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
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
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
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        //check if users subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            className={`plansScreen__plan ${
              isCurrentPackage && "plansScreen__plan--disabled"
            }`}
            key={productId}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
