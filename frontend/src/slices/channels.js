import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';


const fetchData = createAsyncThunk(
  'channels/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status || 'Unknown',
      });
    }
  },
);

const initialState = {
  loading: false,
  channels: [], // список каналов
  currentChannelId: null, // текущий канал
  error: null, // ошибка при запросе
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {

    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },

    addChannel: (state, { payload }) => {
      const existingChannel = state.channels.find((channel) => channel.id === payload.id);
      if (!existingChannel) {
        state.channels.push(payload); 
      }
    },

  
    deleteChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },


    channelRename: (state, { payload }) => {
      const { id, name } = payload;
      const renamedChannel = state.channels.find((channel) => channel.id === id);
      if (renamedChannel) {
        renamedChannel.name = name;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })

     
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.loading = false;
        const existingChannelIds = state.channels.map((channel) => channel.id);
        const newChannels = payload.filter((channel) => !existingChannelIds.includes(channel.id));
        state.channels = [...state.channels, ...newChannels];
      })

      .addCase(fetchData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? payload.message : 'Неизвестная ошибка';
      });
  },
});


const actions = {
  ...channelsSlice.actions,
  fetchData,
};

export { actions };
export default channelsSlice.reducer;