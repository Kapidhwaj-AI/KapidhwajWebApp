import { removeLocalStorageItem, setLocalStorageItem } from "@/lib/storage";
import { Hub } from "@/models/settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HubSlice {
    remoteHub: Hub | null
    localHub: Hub | null
}

const initialState: HubSlice = {
    remoteHub: null,
    localHub: null
}

const hubSlice = createSlice({
    name: 'manage_hub',
    initialState,
    reducers: {
        setRemoteHub: (state, action: PayloadAction<Hub | null>) => {
            setLocalStorageItem('Remotehub', JSON.stringify(action.payload));
            removeLocalStorageItem('Localhub')
            state.remoteHub = action.payload
        },
        setLocalHUb: (state, action: PayloadAction<Hub | null>) => {
            console.log("Hello", action)
            setLocalStorageItem('Localhub', JSON.stringify(action.payload));
            removeLocalStorageItem('Remotehub')
            state.localHub = action.payload
        }
    }
})

export const {
    setLocalHUb,
    setRemoteHub
} = hubSlice.actions;
export const hubReducer = hubSlice.reducer;