package com.liorderstatus.view.setting;

import android.content.Context;
import android.os.Bundle;
import android.preference.EditTextPreference;
import android.preference.ListPreference;
import android.preference.Preference;
import android.preference.PreferenceFragment;
import android.preference.PreferenceGroup;
import android.preference.PreferenceManager;
import android.support.v7.widget.Toolbar;
import android.util.TypedValue;
import android.view.MenuItem;
import android.view.ViewGroup;

import com.liorderstatus.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by selvaanb on 5/21/2018.
 */

public class SettingsActivity_test extends AppCompatPreferenceActivity {
    private static final String TAG = SettingsActivity_test.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupActionBar();


        final ListPreference listPreference = (ListPreference) findPreference("default_category");
        // load settings fragment
        getFragmentManager().beginTransaction().replace(android.R.id.content, new MainPreferenceFragment()).commit();

        getFragmentManager().executePendingTransactions();


//        final ListPreference listPreference = (ListPreference) findPreference("default_category");

        // THIS IS REQUIRED IF YOU DON'T HAVE 'entries' and 'entryValues' in your XML
//         setListPreferenceData(listPreference);

//        listPreference.setOnPreferenceClickListener(new Preference.OnPreferenceClickListener() {
//            @Override
//            public boolean onPreferenceClick(Preference preference) {
//
//                setListPreferenceData(listPreference);
//                return false;
//            }
//        });
    }

    protected static void setListPreferenceData(ListPreference lp) {
//        CharSequence[] entries = { "English", "French" };
//        CharSequence[] entryValues = {"1" , "2"};
//        lp.setEntries(entries);
//        lp.setDefaultValue("1");
//        lp.setEntryValues(entryValues);


    }
    public static class MainPreferenceFragment extends PreferenceFragment {

        public String loadJSONFromAsset(Context context) {
            String json = null;
            try {
                InputStream is = context.getAssets().open("attribute.json");

                int size = is.available();

                byte[] buffer = new byte[size];

                is.read(buffer);

                is.close();

                json = new String(buffer, "UTF-8");


            } catch (IOException ex) {
                ex.printStackTrace();
                return null;
            }
            return json;

        }

        private PreferenceGroup getParent(Preference preference)
        {
            return getParent(getPreferenceScreen(), preference);
        }

        private PreferenceGroup getParent(PreferenceGroup root, Preference preference)
        {
            for (int i = 0; i < root.getPreferenceCount(); i++)
            {
                Preference p = root.getPreference(i);
                if (p == preference)
                    return root;
                if (PreferenceGroup.class.isInstance(p))
                {
                    PreferenceGroup parent = getParent((PreferenceGroup)p, preference);
                    if (parent != null)
                        return parent;
                }
            }
            return null;
        }

        @Override
        public void onCreate(final Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            addPreferencesFromResource(R.xml.pref_main);

            bindPreferenceSummaryToValue(findPreference("key_attribute_list"));

            final EditTextPreference listPreference = (EditTextPreference) findPreference("key_attribute_list");
            PreferenceGroup group = getParent(listPreference);

            group.removePreference(listPreference);




            try {
                JSONObject mainObject = new JSONObject(loadJSONFromAsset(getActivity()));
                JSONArray uniObject = mainObject.getJSONArray("attr");
                String summary = "";
                for(int i=0;i<uniObject.length();i++){
                    JSONObject objects = uniObject.getJSONObject(i);
                    String type = objects.getString("attrType");

                    ListPreference edit = new ListPreference(this.getActivity());
                    edit.setTitle(type);

                    JSONArray unitArray = objects.getJSONArray("unit");
                    if(unitArray != null){
                        CharSequence[] entries = {};
                        CharSequence[] entryValues = {};
                        List<String> listItems = new ArrayList<String>();
                        List<String> listItemsEntry = new ArrayList<String>();

                        for(int j=0;j<unitArray.length();j++){
                            JSONObject units = unitArray.getJSONObject(j);
                            String unitString = units.getString("unitStr");
                            String unitName = units.getString("unitName");
                            listItems.add(unitString);
                            listItemsEntry.add(unitName);
                            if(j==0)
                                summary = unitString;
                        }
                        entries = listItems.toArray(new CharSequence[listItems.size()]);
                        entryValues = listItems.toArray(new CharSequence[listItemsEntry.size()]);

                        edit.setEntries(entries);
                        edit.setEntryValues(entryValues);
                        edit.setDefaultValue(listItems.get(0));


                    }
                    summary = summary.trim();
                    if(i==7){
                        String here = summary;
                        here = here + '3';
                    }
                    if(i != 7 && i<=20){
                        if(edit != null && !summary.isEmpty()){
                            edit.setSummary(summary);
                            group.addPreference(edit);
                        }

                    }

                }



//                listPreference.setEntries(entries);
//                listPreference.setDefaultValue("1");
//                listPreference.setEntryValues(entryValues);

            } catch (JSONException e) {
                e.printStackTrace();
            }
            ;


        }
    }
    private void setupActionBar() {
        getLayoutInflater().inflate(R.layout.toolbar, (ViewGroup)findViewById(android.R.id.content));
        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        int horizontalMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 2, getResources().getDisplayMetrics());
        int verticalMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 2, getResources().getDisplayMetrics());
        int topMargin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, (int) getResources().getDimension(R.dimen.activity_vertical_margin), getResources().getDisplayMetrics());
        topMargin = topMargin + 15;
        getListView().setPadding(horizontalMargin, topMargin, horizontalMargin, verticalMargin);
        if(toolbar != null){
            setSupportActionBar(toolbar);
        }
    }
    protected boolean isValidFragment(String fragmentName) {
        return PreferenceFragment.class.getName().equals(fragmentName)
                || SettingsActivity_test.MainPreferenceFragment.class.getName().equals(fragmentName);

    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }

    private static void bindPreferenceSummaryToValue(Preference preference) {
        preference.setOnPreferenceChangeListener(sBindPreferenceSummaryToValueListener);

        sBindPreferenceSummaryToValueListener.onPreferenceChange(preference,
                PreferenceManager
                        .getDefaultSharedPreferences(preference.getContext())
                        .getString(preference.getKey(), ""));
    }



    private static Preference.OnPreferenceChangeListener sBindPreferenceSummaryToValueListener = new Preference.OnPreferenceChangeListener() {
        @Override
        public boolean onPreferenceChange(Preference preference, Object value) {
            String stringValue = value.toString();

            if (preference instanceof ListPreference) {
                // For list preferences, look up the correct display value in
                // the preference's 'entries' list.
                ListPreference listPreference = (ListPreference) preference;
                int index = listPreference.findIndexOfValue(stringValue);

                // Set the summary to reflect the new value.
                preference.setSummary(
                        index >= 0
                                ? listPreference.getEntries()[index]
                                : null);



            }
            else if (preference instanceof EditTextPreference) {
                if (preference.getKey().equals("rackbarcode_length") || preference.getKey().equals("glassbarcode_length") || preference.getKey().equals("itembarcode_length") ||
                preference.getKey().equals("machineId_length") || preference.getKey().equals("workstep_length") || preference.getKey().equals("key_appversion")) {
                    // update the changed gallery name to summary filed
                    preference.setSummary(stringValue);

                }
            }else {
                // For all other preferences, set the summary to the value's
                // simple string representation.
                preference.setSummary(stringValue);
            }
            return true;
        }
    };
}
