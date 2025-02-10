import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channel: null,
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (action) => {
      this.state.modalType = action.payload.type;
      this.state.channel = action.payload.channel;
    },
    closeModal: () => {
      this.state.modalType = null;
      this.state.channel = null;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
