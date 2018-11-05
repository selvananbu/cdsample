package com.liorderstatus.view;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.liorderstatus.MainApplication;

public abstract class ReactFragment extends Fragment {

    private Bundle initialProps;
    public void setmReactInstanceManager(ReactInstanceManager mReactInstanceManager) {
        this.mReactInstanceManager = mReactInstanceManager;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        mReactRootView = new ReactRootView(context);
        mReactInstanceManager =
                ((MainApplication) getActivity().getApplication())
                        .getReactNativeHost()
                        .getReactInstanceManager();
        if(mReactInstanceManager == null && mReactInstanceManager.getCurrentReactContext() == null){
            Log.d("Here2222", "2222");
        }
    }
    public void addInitialProps(Bundle initialProps){
        this.initialProps = initialProps;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    protected ReactRootView mReactRootView;
    protected ReactInstanceManager mReactInstanceManager;
    protected ReactApplication mreactMainApplication;


    // This method returns the name of our top-level component to show
    public abstract String getMainComponentName();



    @Override
    public void onDetach() {
        super.onDetach();
    }

    @Override
    public ReactRootView onCreateView(LayoutInflater inflater, ViewGroup group, Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        return mReactRootView;
    }


    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mReactRootView.startReactApplication(
                mReactInstanceManager,
                getMainComponentName(),
                initialProps
        );
    }

    public void setMainApplication(ReactApplication mainApplication) {
        this.mreactMainApplication = mainApplication;
    }

}