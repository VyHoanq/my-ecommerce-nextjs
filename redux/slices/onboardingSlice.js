const {createSlice, current}= require ("@reduxjs/toolkit")
const initialState={
    currentStep:1,
    onboardingFormData:{}
}
const onboardingSlice = createSlice({
    name:"onboarding",
    initialState,
    reducers:{
        setCurrentStep :(state,action) =>{
            state.currentStep=action.payload
        },
        updateOnboardingFormData:(state,action) =>{
            // state.personalInfo={...state.personalInfo,...action.payload};
            state.onboardingFormData={
                ...state.onboardingFormData,
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
    updateOnboardingFormData
} = onboardingSlice.actions;
export default onboardingSlice.reducer;