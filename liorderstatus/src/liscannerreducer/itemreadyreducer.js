const initial = {
  item:{},
  worksteplist:{},
  machinelist:{},
  reasonlist:{}
}

export default function(state= initial,action){
  switch(action.type){
    case  "SET_ITEM":
    state  =  {
      ...state,
      item: { ['ITEM']:  action.payload },
    }
    break;
    case  "SET_WORKSTEP_LIST":
    state  =  {
      ...state,
      worksteplist: { ['WORKSTEPLIST']:  action.payload },
    }
    break;
    case  "SET_MACHINE_LIST":
    state  =  {
      ...state,
      machinelist: { ['MACHINELIST']:  action.payload },
    }
    break;
    case  "SET_REASON_LIST":
    state  =  {
      ...state,
      reasonlist: { ['REASONLIST']:  action.payload },
    }
    break;
  }
  return state;
}
