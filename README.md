## Sketch Symbols Manager by STRV ##

### Instalation - for designers ###

Simply download zip file from this link:
[Download plugin](https://github.com/strvcom/sketch-symbols-plugin/raw/master/release/sketch-symbols-plugin.zip)
Unzip the file and double click the file inside it. After that you will get notified about every new version when you start Sketch.

_Note: You need at least v.50 of the Sketch_

### Requirements for developers ###

* Sketch v.50 and higher
* Node and npm

### Instalation - for developers ###

When you want to make some changes on the plugin, clone this repo and follow these steps:
* `npm install`
* `npm run link`
  * _this will build the plugin and link it to your Sketch instalation_

After that you can just:
* `npm run build` - this will build the plugin
* `npm run watch` - this will watch for changes and build the plugin on save 

### Debugging and other tips ###

Debugging is little cumbersome. You don't have access to Chrome Dev Tools and if you do something bad, Sketch usually crashes.
But still you can log some things out when needed.
You have two ways to do it.

1. Download [Sketch Developer Tools](https://github.com/skpm/sketch-dev-tools/releases/latest). It is basically another plugin for sketch. It has console where you can send some logs with `log()` or `console.log()`
2. Use default Mac Console App. Filter results like this:
  * Write `Sketch` and press return. Then change it's type to `process`
  * Write `Sketch` and press return again. Then change this type to `library`
  * Save this filter for later so you dont have to search for it again
The default console app is little messy tho. You can't get all the data you need when you for example log some Sketch object. But for some small logs it's ok.

__Tips__
When Sketch crashes it goes into safe mode and disables all plugins on next launch. To disable this feature for convenience use this:
`defaults write com.bohemiancoding.sketch3 disableAutomaticSafeMode true`

Sometimes you might want to execute a function on some Sketch action. To monitor them all to find the right one do this:
* `defaults write com.bohemiancoding.sketch3 actionWildcardsAllowed -bool YES`
* then in manifest.json:
  * `{
      ...
      "handlers": {
+       "actions": {
+         "*": "onActionHandler"
+        }
      }
      ...
    }`
It has some toll on performance so disable it after you find the action you need.

_Notes on architecture_
Once you open the plugin, the `main.js` function gets executed.
It opens a webview and waits for other functions that are called in the webview where main React app is running.
You can therefore think about it like `src/..` is your backend and `resources/..` is your frontend.

### Releasing new version ###