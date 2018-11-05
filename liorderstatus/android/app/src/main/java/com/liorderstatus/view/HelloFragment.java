package com.liorderstatus.view;

import com.liorderstatus.MainApplication;

public class HelloFragment extends ReactFragment {
    @Override
    public void onDestroy() {
        super.onDestroy();
    }
    @Override
    public String getMainComponentName() {
        return "liorderstatus"; // name of our React Native component we've registered
    }


    @Override
    public void onDetach() {
        super.onDetach();
        if(mReactInstanceManager!=null){
            ((MainApplication) getActivity().getApplication()).getReactNativeHost().clear();
        }
    }
}
