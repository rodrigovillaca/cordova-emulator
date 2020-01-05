# cordova-emulator

Emulator menu for cordova and ionic projects. 

It's a menu selection for `cordova emulate` or `ionic cordova emulate` (it auto-detects ionic projects). Allow selecting the target using a user-friendly menu, very useful for testing on multiple os/devices. 

## Installation

Install by running: `npm install cordova-emulator -g`

If you are using nvm and old node versions, you might get an error similar to the following  when trying to run the first time: /usr/local/bin/cordova-emulator: No such file or directory

If that happens you need to re-select your node version to update path. It happened when used it with a node 6.12.1 / ionic1 project. I needed to reload, not needed with node 10/12.


## Usage
Run the command `cordova-emulator` in a cordova/ionic project root folder (same place as you would run cordova emulate).

```shell
$ cordova-emulator 
(x) ios
( ) android
```

If you select ios you will see something similar to the following menu:
```
(x) Select a iOS version:
( ) iOS 8.4
( ) iOS 9.3
( ) iOS 10.3
( ) iOS 11.1
( ) iOS 11.3
( ) iOS 11.4
( ) iOS 12.1
( ) iOS 13.2
```

and then something like:
```
(x) iPhone 5
( ) iPhone 5s
( ) iPhone 6 Plus
( ) iPhone 6
( ) iPhone 6s
( ) iPhone 6s Plus
( ) iPhone SE
( ) iPhone 7
( ) iPhone 7 Plus
( ) iPad Air
( ) iPad Air 2
( ) iPad Pro (9.7 inch)
( ) iPad Pro (12.9 inch)
( ) iPad (5th generation)
( ) iPad Pro (12.9-inch) (2nd generation)
( ) iPad Pro (10.5-inch)
```

For android you see a list of android virtual device images like:
```
(x) android7
( ) Android8
( ) Pixel_2_API_26
( ) Pixel_3_API_29
( ) androidx2
( ) Pixel3
```

If you select a device on ios or an android virtual device image, `cordova emulate` or `ionic cordova emulate` will run with the selected target.


Any arguments passed to the script will be passed to `cordova emulate` or `ionic cordova emulate`, so you can do this:

```shell
$ cordova-emulator --livereload
```