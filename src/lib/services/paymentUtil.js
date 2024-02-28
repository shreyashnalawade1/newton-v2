import { loadStripe } from "@stripe/stripe-js";

export const handlePayment = async (id) => {
  const stripe = await loadStripe(
    "pk_test_51OmrWkSBsszi8EgzTDqm6aQ8AVx3arOprT6pT2a7uixYSoCvjwmuYVrT5ogxhFyRgbwFCZiCIgj0DDCjGEZSYaRB00L02Ar4np"
  );

  //   console.log(
  //     ""
  //   );
  //   return id;
  try {
    const response = await fetch(
      "https://newton-tan.vercel.app/api/files/buy/" + id
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  } catch (err) {
    console.log(err);
  }
};
