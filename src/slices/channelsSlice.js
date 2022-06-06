import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setAlreadyExistingChannels: (state, action) => {
            state.channels = action.payload;
            console.log(state.channels);
        },
    },
});

export const { setAlreadyExistingChannels } = channelsSlice.actions;

export default channelsSlice.reducer;