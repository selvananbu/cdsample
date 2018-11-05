package com.liorderstatus.connector;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ResolveInfo;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Parcelable;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.liorderstatus.MainActivity;
import com.reactlibrary.view.ListConnectionActivity;
import com.reactlibrary.view.NewConnectionActivity;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import static com.reactlibrary.util.FileUtil.isFileExistInDevice;

public class MenuModule extends ReactContextBaseJavaModule {

    ReactApplicationContext mreactContext;
    Locale myLocale;
    String currentLanguage = "en", currentLang;

    public MenuModule(ReactApplicationContext reactContext, Context context) {
        super(reactContext);
        mreactContext = reactContext;

    }
    @Override
    public String getName() {
        return "MenuExample";
    }

    @ReactMethod
    void setTitle(final String title){
        final Activity activity = getCurrentActivity();
        if(activity!=null){
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.setTitle(title);
                }
            });
        }
    }

    @ReactMethod
    void startGraphicsViewerForSideView(String datauri){
        Intent sendIntent = new Intent();
        List<Intent> targetedShareIntents = new ArrayList<Intent>();
        String[] lines = datauri.split(",");

        String title = "View Order:" +lines[0] + " Item:" + lines[1] + "  in ....";
        sendIntent.setAction(Intent.ACTION_SEND);



        sendIntent.setType("text/plain");
        List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
        if (!resInfo.isEmpty()) {
            for (ResolveInfo resolveInfo : resInfo) {
                String packageName = resolveInfo.activityInfo.packageName;
                Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                targetedShareIntent.setType("text/plain");
                if ((TextUtils.equals(packageName, "com.ligraphicsviewer" ))|| (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
                {
                    targetedShareIntent.setPackage(packageName);

                    targetedShareIntent.putExtra("Order No", lines[0]);
                    targetedShareIntent.putExtra("Item No", lines[1]);

                    targetedShareIntent.putExtra("fromOrderStatus",true);

                    targetedShareIntents.add(targetedShareIntent);
                }
            }
        }
        Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
        getCurrentActivity().startActivity(chooserIntent);
    }

    @ReactMethod
    void startDocCenter(String orderNo,String docType){
        Intent sendIntent = new Intent();
        List<Intent> targetedShareIntents = new ArrayList<Intent>();
        String title = "View Order:" +orderNo + " in...";

        sendIntent.setAction(Intent.ACTION_SEND);




        sendIntent.setType("text/plain");
        List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
        if (!resInfo.isEmpty()) {
            for (ResolveInfo resolveInfo : resInfo) {
                String packageName = resolveInfo.activityInfo.packageName;
                Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                targetedShareIntent.setType("text/plain");
                if ((TextUtils.equals(packageName, "com.ligraphicsviewer" )) || (TextUtils.equals(packageName, "com.lidoccenter" ))|| (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
                {
                    targetedShareIntent.setPackage(packageName);
                    targetedShareIntent.putExtra("OrderNo", orderNo);
                    targetedShareIntent.putExtra("DocType", docType);
                    targetedShareIntents.add(targetedShareIntent);
                }
            }
        }
        Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
        getCurrentActivity().startActivity(chooserIntent);
    }

//    @ReactMethod
//    void startOrderIntent(int orderNo,int itemNo){
//        Intent sendIntent = new Intent();
//        String title = "View Order:" +orderNo + " in...";
//        List<Intent> targetedShareIntents = new ArrayList<Intent>();
//        sendIntent.setAction(Intent.ACTION_SEND);
//        sendIntent.setType("text/plain");
//
//        List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
//        if (!resInfo.isEmpty()) {
//            for (ResolveInfo resolveInfo : resInfo) {
//                String packageName = resolveInfo.activityInfo.packageName;
//                Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
//                targetedShareIntent.setType("text/plain");
//                if ((TextUtils.equals(packageName, "com.ligraphicsviewer" ))|| (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
//                {
//                    targetedShareIntent.setPackage(packageName);
//                    targetedShareIntent.putExtra("Order No",orderNo);
//                    targetedShareIntent.putExtra("Item No", itemNo);
//                    targetedShareIntent.putExtra("fromOrderStatus",true);
//                    targetedShareIntents.add(targetedShareIntent);
//                }
//            }
//        }
//        Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
//        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
//        getCurrentActivity().startActivity(chooserIntent);
//    }

    @ReactMethod
    void setLocale(String localeName){
        if (!localeName.equals(currentLanguage)) {
//            myLocale = new Locale(localeName);
//            Resources res = getCurrentActivity().getResources();
//            DisplayMetrics dm = res.getDisplayMetrics();
//            Configuration conf = res.getConfiguration();
//            conf.locale = myLocale;
//            res.updateConfiguration(conf, dm);
//            Intent refresh = new Intent(getCurrentActivity(), MainActivity.class);
//            refresh.putExtra(currentLang, localeName);
//            getCurrentActivity().startActivity(refresh);

//            myLocale = new Locale(localeName);
//            Locale.setDefault(myLocale);
//            android.content.res.Configuration config = new android.content.res.Configuration();
//            config.locale = myLocale;
//            getReactApplicationContext().getResources().updateConfiguration(config,
//                    getReactApplicationContext().getResources().getDisplayMetrics());

            if(localeName.toString().equals("deu")){
                localeName = "de";
            }
            else if(localeName.toString().equals("eng")){
                localeName = "en";
            }
            myLocale=new Locale(localeName);
            Resources resources=getCurrentActivity().getResources();
            DisplayMetrics dm=resources.getDisplayMetrics();
            Configuration conf= resources.getConfiguration();
            conf.locale=myLocale;
            resources.updateConfiguration(conf,dm);
            Intent refreshIntent=new Intent(getCurrentActivity(),MainActivity.class);
            getCurrentActivity().finish();
            getCurrentActivity().startActivity(refreshIntent);
        }
        else {
            Toast.makeText(getCurrentActivity(), "Language already selected!", Toast.LENGTH_SHORT).show();
        }
    }
    @ReactMethod
    void writeKeyValueItem(String key,String value){

        SharedPreferences prefs = getCurrentActivity().getSharedPreferences("maindb",
                getReactApplicationContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(key,value);
        editor.commit();


    }
    @ReactMethod
    void writeKeyValueInteger(String key,Integer value){

        SharedPreferences prefs = getCurrentActivity().getSharedPreferences("maindb",
                getReactApplicationContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putInt(key,value);
        editor.commit();


    }

    @ReactMethod
    void startOrderIntent(ReadableMap props){

        if(props.hasKey("orderNo") || props.hasKey("docType")){
            int orderNo = -1;
            int itemNo = -1;
            int paneNo = -1;
            int compNo = -1;
            int docType = -1;
            int documentNo = -1;

            if(props.hasKey("orderNo")){
                orderNo = props.getInt("orderNo");
                itemNo = props.getInt("itemNo");
            }

            if(props.hasKey("paneNo")){
                 paneNo = props.getInt("paneNo");
                 compNo = props.getInt("compNo");
            }
            if(props.hasKey("docType")){
                docType = props.getInt("docType");
                documentNo = props.getInt("customerNo");
            }


            Intent sendIntent = new Intent();
            String title = "View Order:" +orderNo + " in...";
            List<Intent> targetedShareIntents = new ArrayList<Intent>();
            sendIntent.setAction(Intent.ACTION_SEND);
            sendIntent.setType("text/plain");

            List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
            if (!resInfo.isEmpty()) {
                for (ResolveInfo resolveInfo : resInfo) {
                    String packageName = resolveInfo.activityInfo.packageName;
                    Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                    targetedShareIntent.setType("text/plain");
                    if ((TextUtils.equals(packageName, "com.ligraphicsviewer" )) || (TextUtils.equals(packageName, "com.venutest" )) || (TextUtils.equals(packageName, "com.tester" )) || (TextUtils.equals(packageName, "com.lireporter" )) || (TextUtils.equals(packageName, "com.lidoccenter" )) || (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
                    {
                        targetedShareIntent.setPackage(packageName);
                        targetedShareIntent.putExtra("Order No",orderNo);
                        targetedShareIntent.putExtra("Item No", itemNo);
                        if(paneNo != -1){
                            targetedShareIntent.putExtra("Pane No", paneNo);
                            targetedShareIntent.putExtra("Comp No", compNo);
                        }
                        if(docType != -1){
                            title = "View Document No :" +documentNo + " in...";
                            targetedShareIntent.putExtra("DocType", docType);
                            targetedShareIntent.putExtra("Customer No", documentNo);
                        }

                        targetedShareIntent.putExtra("fromOrderStatus",true);
                        targetedShareIntents.add(targetedShareIntent);
                    }
                }
            }
            Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
            chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
            getCurrentActivity().startActivity(chooserIntent);
        }

    }

    @ReactMethod
    void startGraphicsViewer(String datauri){
        Intent sendIntent = new Intent();
        List<Intent> targetedShareIntents = new ArrayList<Intent>();

        sendIntent.setAction(Intent.ACTION_SEND);
        String[] lines = datauri.split(",");
        String title = "View Order:" +lines[0] + " Item:" + lines[1] + "  in ....";


        sendIntent.setType("text/plain");
        List<ResolveInfo> resInfo = getCurrentActivity().getPackageManager().queryIntentActivities(sendIntent, 0);
        if (!resInfo.isEmpty()) {
            for (ResolveInfo resolveInfo : resInfo) {
                String packageName = resolveInfo.activityInfo.packageName;
                Intent targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                targetedShareIntent.setType("text/plain");
                if ((TextUtils.equals(packageName, "com.ligraphicsviewer" ))|| (TextUtils.equals(resolveInfo.activityInfo.processName,"com.google.android.apps.docs:Clipboard" )))
                {
                    targetedShareIntent.setPackage(packageName);

                    targetedShareIntent.putExtra("Order No", lines[0]);
                    targetedShareIntent.putExtra("Item No", lines[1]);
                    targetedShareIntent.putExtra("Pane No", lines[2]);
                    targetedShareIntent.putExtra("Comp No", lines[3]);

                    targetedShareIntent.putExtra("fromOrderStatus",true);

                    targetedShareIntents.add(targetedShareIntent);
                }
            }
        }
        Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), title);
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, targetedShareIntents.toArray(new Parcelable[targetedShareIntents.size()]));
        getCurrentActivity().startActivity(chooserIntent);
    }

    @ReactMethod
    public void showToast(String message){
        Toast toast = Toast.makeText(mreactContext, message, Toast.LENGTH_SHORT);
        toast.show();
    }

    @ReactMethod
    public void startConnectionActivity(){
        if(mreactContext != null && !isFileExistInDevice(mreactContext)){
            Intent newconnectionIntent = new Intent(getCurrentActivity(), NewConnectionActivity.class);
            getCurrentActivity().startActivityForResult(newconnectionIntent, 2);
        }
        else{
            Intent listconnectionIntent = new Intent(getCurrentActivity(), ListConnectionActivity.class);
            getCurrentActivity().startActivityForResult(listconnectionIntent, 2);
        }

    }
}
