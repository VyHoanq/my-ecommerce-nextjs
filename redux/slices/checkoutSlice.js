const {createSlice, current}= require ("@reduxjs/toolkit")
const initialState={
    currentStep:1,
    checkoutFormData:{}
}
const checkoutSlice = createSlice({
    name:"checkout",
    initialState,
    reducers:{
        setCurrentStep :(state,action) =>{
            state.currentStep=action.payload
        },
        updateCheckoutFormData:(state,action) =>{
            // state.personalInfo={...state.personalInfo,...action.payload};
            state.checkoutFormData={
                ...state.checkoutFormData,
                ...action.payload,    
            }
        },
        // updateCombinedData:(state,action)=>{
        //     state.combinedData={
        //         ...state.personalInfo,
        //         ...state.shippingInfo,
        //         ...action.payload
        //     }
        // }
    }
       
});
export const {
    setCurrentStep,
    updateCheckoutFormData
} = checkoutSlice.actions;
export default checkoutSlice.reducer;