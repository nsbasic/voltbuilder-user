# VoltBuilder
Front end to Cordova to create signed apps

## Build a project

```
python3 voltbuilder.py ~/Project13.appstudio/UUID
```

## Start the server

```
pipenv run start
```

## Call the server

```
r = requests.post(
    "http://99.237.86.51:22894/",
    files={"app": open(zipname, "rb")},
    data={
        "androidKeystore": "certificates/android.keystore",
        "androidKeystorePassword": "mypassword",
        "iosDevP12": "certificates/ios_development.p12",
        "iosDevP12Password": "george",
        "iosDevelopment": "certificates/development.mobileprovision",
        "iosDistP12": "certificates/ios_distribution.p12",
        "iosDistP12Password": "george",
        "iosDistribution": "certificates/distribution.mobileprovision",
        "platform": "android",
        "release": "debug",
        "serial": "w31-509-91e",
    }
)
```

## Get lint going
```
pyenv local 3.7.6
pip install requests
pip install qrcode[pil]
pipenv install --dev
pipenv run lint:fix
```

## CocoaPods

Install Ruby: https://github.com/rbenv/rbenv#installation

Install CocoaPods: https://guides.cocoapods.org/using/getting-started.html#installation
