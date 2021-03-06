package com.project5;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.dooboolab.naverlogin.RNNaverLoginPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import java.security.MessageDigest;
import android.util.Log;
import java.security.NoSuchAlgorithmException;

import static com.kakao.util.helper.Utility.getPackageInfo;



public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RNKakaoLoginsPackage(),
              new RNNaverLoginPackage(),
              new FBSDKPackage(mCallbackManager)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
        }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    //SoLoader.init(this, /* native exopackage */ false);
    Log.i("Hash:",getKeyHash(this));
  }

  public String getKeyHash(final Context context) {
    PackageInfo packageInfo = getPackageInfo(context, PackageManager.GET_SIGNATURES);
    if (packageInfo == null) {
      return null;
    }

    for (Signature signature : packageInfo.signatures) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA");
            md.update(signature.toByteArray());
            return android.util.Base64.encodeToString(md.digest(), android.util.Base64.NO_WRAP);
        } catch (NoSuchAlgorithmException e) {
            Log.w("HashKey", "Unable to get MessageDigest. signature=" + signature, e);
        }
    }
    return null;
  }
}
