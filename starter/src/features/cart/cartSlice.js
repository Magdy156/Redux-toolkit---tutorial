import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: 2,
  total: 0,
  isLoading: false,
};

// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (action.payload === item.id) {
          item.amount += 1;
          return item;
        }
        return item;
      });
    },
    decrease: (state, action) => {
      state.cartItems = state.cartItems
        .map((item) => {
          if (action.payload === item.id) {
            item.amount -= 1;
            return item;
          }
          return item;
        })
        .filter((item) => item.amount > 0);
    },
    calcTotalAndAmount: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
  //   extraReducers: {
  //     [getCartItems.pending]: (state) => {
  //       state.isLoading = true;
  //     },
  //     [getCartItems.fulfilled]: (state, action) => {
  //       state.isLoading = false;
  //       state.cartItems = action.payload;
  //     },
  //     [getCartItems.rejected]: (state) => {
  //       state.isLoading = false;
  //     },
  //   },
});
console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calcTotalAndAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
