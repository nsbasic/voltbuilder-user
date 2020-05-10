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
├-- merges
│   ├-- android
│   └-- ios
├-- voltbuilder.json
└-- www
    ├-- css
    ├-- images
    ├-- index.html
    ├-- js
    └-- android.keystore
```

certificates: This folder holds your certificates. If you're only building for Android, you do not to supply mobileprovision or p12 files. If you are only making a debug build for Android, you don't even need a keystore file.

voltbuilder.json: This file has information about the build. Copy and paste this into a file named voltbuilder.json and customize it for your configuration. If you're only building for Android, you can leave the ios fields empty.

```
{
    "androidAlias": "key0",
    "androidAliasPassword": "mypassword",
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

*   `iosPackageType` can be `ad-hoc`, `app-store` or `enterprise`
*   `platform` can be `ios` or `android`
*   `release` can be `debug` or `release`
*   `serial` identifies you to VoltBuilder. We will be giving you a serial number for beta testing.
*   The test server does not support HTTPS yet. You will not be able to download .ipa files directly to iOS devices. If you save them to your own https enabled server, they should work.

**Things which could go wrong**

# Make sure your index.htm (or other file) does not include phonegap.js. Voltbuilder will include cordova.js automatically.
