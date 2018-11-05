package com.liorderstatus;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Parcel;
import android.os.Parcelable;
import android.preference.ListPreference;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.MenuItem;

import com.facebook.react.ReactActivity;
import com.horcrux.svg.SvgPackage;
import com.liorderstatus.view.setting.SettingsActivity_test;
import com.reactlibrary.JSBundleManager ;
import com.oblador.vectoricons.VectorIconsPackage;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.liorderstatus.view.HelloFragment;
import com.reactlibrary.JSBundleManager;
import com.reactlibrary.JSBundleManagerActivity;
import com.reactlibrary.model.Connection;
import com.reactlibrary.util.FileUtil;
import com.reactlibrary.view.ListConnectionActivity;
import com.reactlibrary.view.NewConnectionActivity;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.reactlibrary.util.FileUtil.isFileExistInDevice;
import static com.reactlibrary.view.ListConnectionActivity.versionList;


public class MainActivity extends JSBundleManagerActivity implements  JSBundleManager.Interface, DefaultHardwareBackBtnHandler, NavigationView.OnNavigationItemSelectedListener {



    private HelloFragment mViewFragment;
    private ReactInstanceManager mReactInstanceManager;
    public static ArrayList<String> menuString = new ArrayList<>();
    ReactApplicationContext menuContext;

    public void setMenuContext(ReactApplicationContext menuContext) {
        this.menuContext = menuContext;
    }

    public ReactApplicationContext getMenuContext() {
        return menuContext;
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Bundle initialProps = new Bundle();

        mReactInstanceManager =
                ((MainApplication) getApplication()).getReactNativeHost().getReactInstanceManager();

        Intent intent = getIntent();
        if(intent != null && mReactInstanceManager != null && mReactInstanceManager.getCurrentReactContext() != null) {
            Bundle data = intent.getExtras();
            if (data != null) {
                String dataVal = data.getString("Order No");
                if (dataVal != null) {
                    WritableMap params = Arguments.createMap();
                    params.putString("orderNo", dataVal);
                    mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("sendOrderNo", params);
                }
            }
        }

        if(intent != null) {
            Bundle data = intent.getExtras();
            if (data != null) {
                int orderNo = data.getInt("Order No");
                int docType = data.getInt("DocType");
                int customerNo = data.getInt("Customer No");

                initialProps.putInt("orderNo", orderNo);
                if(orderNo != -1){
                    initialProps.putInt("triggerType",3);

                }
                else if(customerNo != -1){
                    initialProps.putInt("triggerType",1);
                }
                initialProps.putInt("docType",docType);
                initialProps.putInt("customerNo",customerNo);


            }
        }

        String baseurl = null;
        String username = null;
        String sitename = null;
        String accessToken = null;
        String refreshToken = null;
        String selectedId = null;
        String extra = null;
        String lang = null;
        Boolean isLoggedIn = false;
        ArrayList versionList = new ArrayList();
        Map<String,?> keys = null;
        ArrayList<String> multitermlist = new ArrayList<String>();

        try {
            Context con = createPackageContext("com.liappmanager", 0);                                                                    //getting package context but here is the problem we need to know the app name and such contexts can  be stored inside an app only
            SharedPreferences pref = con.getSharedPreferences(
                    "maindb", Context.MODE_PRIVATE);

          keys = pref.getAll();


            for(Map.Entry<String,?> entry : keys.entrySet()){
                if(entry != null){
                    String val = entry.getKey() + "," + entry.getValue().toString();
                    if(entry.getKey().contains("delayTime") || entry.getKey().contains("version") || entry.getKey().contains("last.loaded") ||
                            entry.getKey().contains(".lastaccesstime") || entry.getKey().contains("text.") || entry.getKey().contains("core.app.language.id3")) {
                        multitermlist.add(val);
                    }
                }
            }


            Log.d("##############",keys.toString());//getting the particular key
            baseurl =  pref.getString("config.baseurl", "No Value");
            username =  pref.getString("config.username", "No Value");
            sitename =  pref.getString("config.sitename", "No Value");
            accessToken =  pref.getString("config.accessToken."+sitename, "No Value");
            refreshToken =  pref.getString("config.refreshToken."+sitename, "No Value");
            selectedId =  pref.getString("config.selectedSiteID", "No Value");
            isLoggedIn =  pref.getBoolean("config.loggedin", false);

        }
        catch (PackageManager.NameNotFoundException e) {
            Log.e("Not data shared", e.toString());
        }

        if(baseurl != "No Value" && baseurl != null){
            initialProps.putString("baseurl",baseurl);
            initialProps.putString("username",username);
            initialProps.putString("sitename",sitename);
            initialProps.putString("accessToken",accessToken);
            initialProps.putString("refreshToken",refreshToken);
            initialProps.putString("selectedid",selectedId);
            initialProps.putBoolean("isLoggedIn",isLoggedIn);
            initialProps.putStringArrayList("extra",multitermlist);
        }
        else{
//            multitermlist.add("text.deu.99024423,\"Vorname\"");
//            multitermlist.add("last.loaded.multiterm.time.deu,Sat Oct 06 2018 09:44:25 GMT+0400 (+04)");
//            multitermlist.add("delayTime,'0'");
//            multitermlist.add("deu.version,2018-10-05T08:08:19");
//            multitermlist.add("core.app.language.id3,deu");
//
//
//
//            initialProps.putString("baseurl","http://swpdmsrv4.lisec.internal/");
//            initialProps.putString("username","anbu");
//            initialProps.putString("sitename","PROD");
//            initialProps.putString("accessToken","eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyI4MCI6dHJ1ZSwiODAwMDAwMSI6dHJ1ZSwiODAwMDAwMiI6dHJ1ZSwiODAwMDAwMyI6dHJ1ZSwiODAwMDAwNCI6dHJ1ZSwiODAwMDAwNSI6dHJ1ZSwiODAwMDAwNiI6dHJ1ZSwiODAwMDAwNyI6dHJ1ZSwiODAwMDAwOCI6dHJ1ZSwiODAwMDAwOSI6dHJ1ZSwiODAwMDAxMCI6dHJ1ZSwiODAwMDAxMSI6dHJ1ZSwiODAwMDAxMiI6dHJ1ZSwiODAwMDAxMyI6dHJ1ZSwiODAwMDAxNCI6dHJ1ZSwiOTAiOnRydWUsIjkwMDAwMDIiOnRydWUsIjkwMDAwMDMiOnRydWUsIjkwMDAwMDQiOnRydWUsIjkwMDAwMDUiOnRydWUsIjkwMDAwMDYiOnRydWUsIjkwMDAwMDciOnRydWUsIjkwMDAwMDgiOnRydWUsIjkwMDAwMDkiOnRydWUsIjkwMDAwMTAiOnRydWUsIjkwMDAwMTEiOnRydWUsIjkwMDAwMTIiOnRydWUsIjkwMDAwMTMiOnRydWUsIjkwMDAwMTQiOnRydWUsIjkwMDAwMTUiOnRydWUsIjkwMDAwMTYiOnRydWUsIjkwMDAwMTciOnRydWUsIjkwMDAwMTgiOnRydWUsIjkwMDAwMTkiOnRydWUsIjkwMDAwMjAiOnRydWUsIjkwMDAwMjEiOnRydWUsIjkwMDAwMjIiOnRydWUsIjkwMDAwMjMiOnRydWUsIjkwMDAwMjQiOnRydWUsIjkwMDAwMjUiOnRydWUsImV4cCI6MTUzODgwNTI2MSwidXNlciI6NX0=.FaDb79sY+hzsgwFHfynX6fKZoINaMkhWRStcAN6XSgaKUH8PnRifXIfh3KvvqvyTO2dSZRCQK877jRkXJzDtQw==");
//            initialProps.putString("refreshToken","aca6f9c5cf9044afa19efd522f4f6173e4d29506a1c54fa186d3d4cb060d3001");
//            initialProps.putString("selectedid","PROD");
//            initialProps.putBoolean("isLoggedIn",true);
//            initialProps.putStringArrayList("extra",multitermlist);
        }



        mViewFragment = new HelloFragment();
        mViewFragment.addInitialProps(initialProps);

        if (mViewFragment != null) {
            mViewFragment.setMainApplication((ReactApplication) getApplication());
            mViewFragment.setmReactInstanceManager(mReactInstanceManager);
        }
        getSupportFragmentManager().beginTransaction().add(R.id.container, mViewFragment).commit();

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        SharedPreferences prefs = getSharedPreferences("demopref",
                mReactInstanceManager.getCurrentReactContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString("demostring", "test");
        editor.commit();


    }


    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d("dsfs","sef");

//        Intent newIntn = getIntent();
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Bundle initialProps = new Bundle();
        if(intent != null) {
            Bundle data = intent.getExtras();
            if (data != null) {
                int orderNo = data.getInt("Order No");
                int docType = data.getInt("DocType");
                int customerNo = data.getInt("Customer No");

                initialProps.putInt("orderNo", orderNo);
                if(orderNo != -1){
                    initialProps.putInt("triggerType",3);

                }
                else if(customerNo != -1){
                    initialProps.putInt("triggerType",1);
                }
                initialProps.putInt("docType",docType);
                initialProps.putInt("customerNo",customerNo);


            }
            mViewFragment = new HelloFragment();
            mViewFragment.addInitialProps(initialProps);

            if (mViewFragment != null) {
                mViewFragment.setMainApplication((ReactApplication) getApplication());
                mViewFragment.setmReactInstanceManager(mReactInstanceManager);
            }
            getSupportFragmentManager().beginTransaction().add(R.id.container, mViewFragment).commit();

            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                    this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
            drawer.setDrawerListener(toggle);
            toggle.syncState();

            NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
            navigationView.setNavigationItemSelectedListener(this);
        }

    }


    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
//        int id = menuItem.getGroupId();
        if(menuItem.getItemId() == R.id.nav_bundle){
            if(versionList.size() <= 0){
                if(!isFileExistInDevice(this)){
                    Intent newconnectionIntent = new Intent(this, NewConnectionActivity.class);
                    startActivityForResult(newconnectionIntent, 2);
                    return true;
                }
            }
            Intent listactivity = new Intent(this, ListConnectionActivity.class);
            startActivityForResult(listactivity, 2);
        }
        else if(menuItem.getItemId() == R.id.nav_settings){
//            Intent settingIntent = new Intent(this, SettingsActivity_test.class);
//           startActivityForResult(settingIntent, 2);
            WritableMap params = Arguments.createMap();

            mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showSettings",params);
            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            drawer.closeDrawer(GravityCompat.START);
            return true;
//            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit("showSettings",params);

        }
        else if(menuItem.getItemId() == R.id.nav_login){
            WritableMap params = Arguments.createMap();
            mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showLogin",params);
            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            drawer.closeDrawer(GravityCompat.START);
            return true;
//            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit("showSettings",params);

        }
        else if(menuItem.getItemId() == R.id.nav_home){
            WritableMap params = Arguments.createMap();
            mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showHome",params);
            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            drawer.closeDrawer(GravityCompat.START);
            return true;
//            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit("showSettings",params);

        }
        else if(menuItem.getItemId() == R.id.nav_newsfeed){
            WritableMap params = Arguments.createMap();
            mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showNewsFeed",params);
            DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
            drawer.closeDrawer(GravityCompat.START);
            return true;
//            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit("showSettings",params);

        }
        if (getMenuContext() == null) return false;
        if(menuItem.getTitle().toString().equals("Item")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showItem",params);
        }
        else if(menuItem.getTitle().toString().equals("Rack")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showRack",params);
        }
        else if(menuItem.getTitle().toString().equals("Commision")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showCommission",params);
        }
        else if(menuItem.getTitle().toString().equals("Utilitie.3s")){
            WritableMap params = Arguments.createMap();
            getMenuContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("showUtilities",params);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onBackPressed() {
        isHomeScreen();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if(!versionList.isEmpty()){
            try {
                FileUtil.addConnectIonListToFile(getBaseContext(),versionList);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    @Override
    protected void refreshFragment() {

    }

    @Override
    protected void onStart() {
        super.onStart();
        super.onStart();
        if(updater == null) {
            updater = getBundleManager(getApplicationContext());

        }
        updater.setParentActivity(this);

    }

    /*
     * Any activity that uses the ReactFragment or ReactActivty
     * Needs to call onHostPause() on the ReactInstanceManager
     */
    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause();
        }
    }

    /*
     * Same as onPause - need to call onHostResume
     * on our ReactInstanceManager
     */
    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences myPrefs = PreferenceManager.getDefaultSharedPreferences(getBaseContext());

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this,this);
        }
        if( mReactInstanceManager.getCurrentReactContext() == null)return;

        boolean vibrate = myPrefs.getBoolean("soft_scan_key",true);
        WritableMap params = Arguments.createMap();
        params.putBoolean("softkey",vibrate);
        mReactInstanceManager.getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onSoftKeyDisabled",params);

    }

    public boolean isHomeScreen() {

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if(drawer.isDrawerOpen(GravityCompat.START)){
            drawer.closeDrawer(GravityCompat.START);
            return true;
        }

        else {
            mReactInstanceManager.onBackPressed();
            return true;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1){
            Bundle dataBundle =  data.getExtras();
            Connection newConnection  = dataBundle.getParcelable("URL");
            versionList.add(newConnection);
        }
        else {
            if (resultCode == Activity.RESULT_OK) {
                Bundle dataBundle = data.getExtras();
                Connection newConnection = dataBundle.getParcelable("URL");
                if (newConnection != null) {
                    versionList.add(newConnection);
                    JSBundleManagerActivity.getBundleManager(getApplicationContext()).setHostnameForRelativeDownloadURLs(newConnection.getConnectionUrl());
                    JSBundleManagerActivity.getBundleManager(getBaseContext()).setUpdateMetadataUrl(newConnection.getConnectionUrl()+"/android/LiOrderStatus/update.json");
                    JSBundleManagerActivity.getBundleManager(getBaseContext()).setmAppName("LiOrderStatus");
                    JSBundleManagerActivity.getBundleManager(getApplicationContext()).checkForUpdates();
                }
            }
        }
    }
}