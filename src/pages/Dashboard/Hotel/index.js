import { useState } from "react";
import NotAllowed from "../../../components/NotAllowed/index";

export default function Hotel() {
  const [isPaid, setIsPaid] = useState("");
  const [message, setMessage] = useState("");

  function checkForPayment() {
    //check if user has already paid
    //return true orf alse 
  }

  if (isPaid) {
    return(
      <NotAllowed message={message} />
    );
  }
}
