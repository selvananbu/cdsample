export const setItem = (value) => {
  return{
    type: "SET_ITEM",
    payload: value
  }
};
export const setWorkstepList = (value) => {
  return{
    type: "SET_WORKSTEP_LIST",
    payload: value
  }
};
export const setMachineList = (value) => {
  return{
    type: "SET_MACHINE_LIST",
    payload: value
  }
};
  export const setReasonList = (value) => {
    return{
      type: "SET_REASON_LIST",
      payload: value
    }
};
