
<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 1.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>

# VoltBuilder for PhoneGap Build Users

Please keep this document confidential: do not share it with anyone. The information here is subject to change without notice.

**Who is NSB Corporation?**

We were founded in 1993 at the introduction of the Newton, when we observed the need for easier to use development tools. Our first product, NS Basic/Newton, was an immediate success. When the Newton was cancelled, we introduced our next product: NS Basic/Palm. It also sold well. A while after, we added NS Basic/CE. 

In 2010, we realized that the speed of JavaScript on mobile devices was beginning to get serious. Web pages in those days used a bit of JavaScript to augment the page: Could we flip things around and make JavaScript the core of web pages, driving the HTML and CSS? That resulted in AppStudio, which targeted iOS and Android. AppStudio now has thousands of users in over 80 countries. In addition, more than 2 million students have learned how to program using it.

The [same core group of developers](https://www.nsbasic.com/app/team/) has been at work on AppStudio for many years. We enjoy what we’re doing - we’ve built up a very [loyal base of customers](https://www.nsbasic.com/app/kudos/) by treating them fairly and providing great support.

**What is VoltBuilder?**

We’ve encouraged our customers to use PhoneGap Build since long before they became part of Adobe. One by one, the friends we made when they were Nitobi drifted away and PhoneGap itself withered. We realized our customers were going to have a big problem unless something was done.

Initially, we built VoltBuilder as something our AppStudio customers could use to replace PhoneGap. That’s working fine - it is in beta now. We hope to release AppStudio with VoltBuilder support in the next couple of weeks.

But when we designed it, we realized that others would need it as well.

**What’s next?**

The build service is running and there is a simple API. We’re talking to PhoneGap users now to get their stories about how they use PhoneGap. Once we have that feedback, we’ll create a web app front end for the public to use.

**VoltBuilder compared to PhoneGap Build**

*   Builds are made using XCode 11.3, so apps meet iTunes Connect requirements
*   Signing keys are uploaded with the app and deleted as soon as the build is complete. They are not stored on the VoltBuilder site.
*   Build times can be faster
*   Resulting builds are smaller
*   VoltBuider uses the latest Cordova sources
*   You can use the same signing keys as with PhoneGap Build
*   As with PhoneGap, you do not need to install Xcode, Android Studio or anything else for it to work.
*   As with PhoneGap, you can use a Windows or Mac computer.

**Project Structure**

VoltBuilder expects your project to be organized in [Cordova CLI project format](http://docs.phonegap.com/phonegap-build/getting-started/app-project-structure/#cli-project).

The PhoneGap Legacy project format is not supported.

**How do I use it?**

VoltBuilder works by uploading a single folder with everything in it. The folder contents are the same as for PhoneGap, with two additional items:

certificates: This is a folder which holds your certificates. Here is a sample:

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/VoltBuilder-for0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/VoltBuilder-for0.png "image_tooltip")

voltbuilder.json: This is a file which contains information about the build. Here’s how it looks: copy and paste this into a file named voltbuilder.json and customize it for your configuration.

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

*   “iosPackageType” can be “ad-hoc”, “app-store” or “enterprise”
*   “platform” can be “ios” or “android”
*   “release” can be “debug” or “release”
*   “serial” identified you to VoltBuilder. We will be giving you a serial number for beta testing.
*   The test server does not support HTTPS yet. You will not be able to download .ipa files directly to iOS devices. If you save them to your own https enabled server, they should work.