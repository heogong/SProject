package com.project12;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.imagepicker.ImagePickerPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.cardio.RNCardIOPackage;
import com.dooboolab.naverlogin.RNNaverLoginPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundGeolocationPackage(),
            new ImagePickerPackage(),
            new RNKakaoLoginsPackage(),
            new RNCameraPackage(),
            new MapsPackage(),
            new RNCardIOPackage(),
            new RNNaverLoginPackage()
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
    SoLoader.init(this, /* native exopackage */ false);
   // Log.i("Hash:",getKeyHash(this));
    
  }

  // public String getKeyHash(final Context context) {
  //   PackageInfo packageInfo = getPackageInfo(context, PackageManager.GET_SIGNATURES);
  //   if (packageInfo == null) {
  //     return null;
  //   }

  //   for (Signature signature : packageInfo.signatures) {
  //       try {
  //           MessageDigest md = MessageDigest.getInstance("SHA");
  //           md.update(signature.toByteArray());
  //           return android.util.Base64.encodeToString(md.digest(), android.util.Base64.NO_WRAP);
  //       } catch (NoSuchAlgorithmException e) {
  //           Log.w("HashKey", "Unable to get MessageDigest. signature=" + signature, e);
  //       }
  //   }
  //   return null;
  // }
}
