# VoltBuilder for PhoneGap Build Users

**Who is NSB Corporation?**

We started in 1993 at the introduction of the Newton to fill the need for easier to use development tools. Our first product, NS Basic/Newton, was a success. When the Newton was cancelled, we introduced NS Basic/Palm. It also did well, so we added NS Basic/CE. 

In 2010, we realized that JavaScript on mobile devices was getting fast. Web pages in those days used a bit of JavaScript to augment the page: Could we flip things around and make JavaScript the core of web pages, driving the HTML and CSS? That resulted in AppStudio, targeting iOS and Android. It now has thousands of users in over 80 countries. More than 2 million students have learned how to program using it.

The [same core group of developers](https://www.nsbasic.com/app/team/) has been at work on AppStudio for many years. We enjoy what we’re doing - we’ve built a [loyal base of customers](https://www.nsbasic.com/app/kudos/) by treating them fairly and providing great support.

**What is VoltBuilder?**

We’ve encouraged our customers to use PhoneGap Build long before they became part of Adobe. One by one, the friends we made when they were Nitobi drifted away and PhoneGap itself withered. We realized our customers were going to have a big problem unless something was done.

Initially, we thought of VoltBuilder as a solution for our AppStudio customers. But when we designed it, we realized that others would need it as well.

**What’s next?**

The build service is running with a [simple front end](http://99.237.86.51:22894/upload/helper.html). Once we have feedback from users, we’ll create a fancier front end for everyone.

**VoltBuilder compared to PhoneGap Build**

*   Builds are made using XCode 11.4, so apps meet latest iTunes Connect requirements
*   Signing keys are uploaded with the app and deleted as soon as the build is complete. They are not stored on the VoltBuilder site.
*   Build times can be faster
*   Builds can be smaller
*   VoltBuilder uses the latest versions of Cordova and XCode
*   You can use the same signing keys as with PhoneGap Build
*   As with PhoneGap, you do not need to install Xcode, Android Studio or anything else for it to work.
*   As with PhoneGap, you can use a Windows or Mac computer.
*   VoltBuilder is designed to be Cordova first. Where different than PhoneGap, Cordova specs prevail. Friendly messages help with any changes.
*   VoltBuilder uses the latest up to date versions of Cordova, Xcode and Android Studio by default, so your apps will stay up to date.

**Project Structure**

VoltBuilder expects your project to be organized in [Cordova CLI project format](http://docs.phonegap.com/phonegap-build/getting-started/app-project-structure/#cli-project).

The PhoneGap Legacy project format is not supported.

**How do I use it?**

VoltBuilder works by uploading a single folder with everything in it. The folder contents are the same as Cordova, with two additional items:
```
Project Root
├-- config.xml
├-- certificates
│   ├-- android.keystore
│   ├-- development.mobileprovision
│   ├-- distribution.mobileprovision
│   ├-- ios_development.p12
│   └-- ios_distribution.p12
├-- merges (optional)
│   ├-- android
│   └-- ios
├-- voltbuilder.json
└-- www
    ├-- css
    ├-- images
    ├-- index.html
    └-- js
```

certificates: This folder holds your certificates. If you're only building for Android, you do not to supply mobileprovision or p12 files. If you are only making a debug build for Android, you don't even need a keystore file.

# voltbuilder.json
This file has information about the build. Copy and paste this into a file named voltbuilder.json and customize it for your configuration. If you're only building for Android, you can leave the ios fields empty.


<table>
<thead>
<tr>
<th>Attributes <br> <span style="font-size:12px; font-weight:normal;">Only for platform</span></th>
<th>Description</th>
</tr>
</thead>
<tr><td><t>androidAlias</th><td>Name of the alias in the android keystore file. Must be in certificates folder.</td></tr>
<tr><td><t>androidAliasPassword</th><td>Password for alias in the Android keystore file.</td></tr>
<tr><td><t>androidDname</th><td>Distinguished Name. User identification for creating Keystore file. Substitute your information. String format is cn=myname, ou=mygroup, o=mycompany, c=mycountry.</td></tr>
<tr><td><t>androidKeystore</th><td>A .keystore file, generated by this procedure. Leave blank for automatic generation by VoltBuilder.</td></tr>
<tr><td><t>androidKeystorePassword</th><td>Password</td></tr>
<tr><td><t>iosDevP12</th><td>The p12 file is generated from the development certificate downloaded from Apple. Must be in the certificates folder. You can use the same p12 for multiple apps. Leave blank if you are not building for iOS.</td></tr>
<tr><td><t>iosDevP12Password</th><td>The password specified when exporting the .p12 file. Leave blank if you are not building for iOS.</td></tr>
<tr><td><t>iosDevelopment</th><td>The mobileprovision file is downloaded from Apple. It specifies which devices the app is allowed to run on. You need a separate mobileprovision file for each one of your apps. Leave blank if you are not building for iOS. Must be in certificates folder.</td></tr>
<tr><td><t>iosDistP12</th><td>The p12 file is generated from the distribution certificate downloaded from Apple. Leave blank if you are not building for iOS Distribution. Must be in certificates folder.</td></tr>
<tr><td><t>iosDistP12Password</th><td>The password specified when exporting the .p12 file. Leave blank if you are not building for iOS Distribution.</td></tr>
<tr><td><t>iosDistribution</th><td>The mobileprovision file is downloaded from Apple. It specifies which devices the app is allowed to run on. You need a separate mobileprovision file for each one of your apps. Leave blank if you are not building for iOS. Must be in certificates folder.</td></tr>
<tr><td><t>iosPackageType</th><td>iOS Release only. Can be `ad-hoc`, `app-store` or `enterprise`</td></tr>
<tr><td><t>platform</th><td>Required. Can be `ios` or `android`.</td></tr>
<tr><td><t>release</th><td>Required. Can be `debug` or `release`.</td></tr>
<tr><td><t>serial</th><td>Required. Identifies you to VoltBuilder. We will be giving you a serial number for beta testing.</td></tr>
</td>
</table>

``` 
{
    "androidAlias": "key0",
    "androidAliasPassword": "mypassword",
    "androidDname": "cn=myname, ou=mygroup, o=mycompany, c=mycountry",
    "androidKeystore": "certificates/android.keystore",
    "androidKeystorePassword": "mypassword",
    "iosDevP12": "certificates/ios_development.p12",
    "iosDevP12Password": "mypassword",
    "iosDevelopment": "certificates/development.mobileprovision",
    "iosDistP12": "certificates/ios_distribution.p12",
    "iosDistP12Password": "mypassword",
    "iosDistribution": "certificates/distribution.mobileprovision",
    "iosPackageType": "app-store",
    "platform": "ios",
    "release": "debug",
    "serial": "XXX-XXX-XXX"
}
```

**Notes**:

*   The test server does not support HTTPS yet. You will not be able to download .ipa files directly to iOS devices. If you save them to your own https enabled server, they should work.

**Things which could go wrong**

1. Make sure your index.htm (or other file) does not include phonegap.js. Voltbuilder will include cordova.js automatically.
1. In config.xml, PhoneGap style `<config-edit` clauses [were made obsolete a while ago](http://docs.phonegap.com/phonegap-build/configuring/config-file-element/). Replace them with `<edit-config`.
1. We're using the latest Cordava tooling. Many plugins and usages will need to be updated: users were held back by PhoneGap not being up to date. If you run into issues, that's one of the first things to consider.
1. If your Cordova project contains plugins/libraries, such as cordova-plugin-x-socialsharing, which reference both the Android Support Library and AndroidX, your Android build will fail because the two cannot live side-by-side in an Android build. This plugin will help: cordova-plugin-androidx-adapter. 
1. To use phonegap-plugin-push: `<plugin name="phonegap-plugin-push" source="npm">`
1. If you get this message "Your config.xml file has obsolete PhoneGap config-xml lines in it.", you'll need to make some changes. Up to cli-7.0.1, PhoneGap allowed this type of clause:
```
<config-file platform="ios" parent="SomeXMLElement" mode="replace">
  <SomeXMLElement someAttribute="text" >Go Skiing</SomeXMLElement>
</config-file>
```
Cordova then started used config-file [for its plugins](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#config-file), which conflicted with the PhoneGap implementation. PhoneGap then changed to use [Cordova's edit-config](https://cordova.apache.org/docs/en/latest/plugin_ref/spec.html#edit-config). You'll need to change these in your config.xml. Consult the documentation for the affected controls for the details.
1. UIWebView Deprecated. Use WKWebview. You will get this message if your config.xml file includes the UIWebView plugin. Remove it, and replace with this:
```
<platform name="ios">
    <preference name="WKWebViewOnly" value="true" />

    <feature name="CDVWKWebViewEngine">
        <param name="ios-package" value="CDVWKWebViewEngine" />
    </feature>

    <preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
</platform>
```
There is more information in the [Cordova docs](https://cordova.apache.org/howto/2020/03/18/wkwebviewonly.html).

