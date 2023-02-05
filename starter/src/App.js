import Navbar from "./components/Navbar";
import CartContainer from "./components/cartContainer";
import { calcTotalAndAmount, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calcTotalAndAmount());
  }, [cartItems]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading ...</h2>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}

      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
