# Cloudinary Signed Upload Helper

The small server included in this repo can be used to test the creation of a signature for [signed uploads](https://cloudinary.com/documentation/upload_images#creating_api_authentication_signatures).
It supplies two endpoints for use with the [Upload Widget](https://cloudinary.com/documentation/upload_widget): _upload_signature_ and _prepare_upload_params_.

## Installation

* clone this repo to your local machine
* make sure you have nodejs installed (and preferably [yarn](https://yarnpkg.com/lang/en/docs/install/) too).
* after cloning run *yarn* or *npm i* at the root of your cloned repo

## Running

Running this app will make a nodejs server run over a port (default: 9991) but you can change that. 
Once running you can make an HTTP request to the following:

```
	http://localhost:9991/sign?param1=aaa&param2=bbbb
	
	or
	
	http://localhost:9991/prepare?param1=aaa&param2=bbbb
	
```

The first time you run the app it will prompt you to enter your cloud's key and secret which are needed to create the signature, as well as the port to run on.

The details you pass that first time will be saved locally for the next runs.

If you'd like to change one of these settings run the app with: _yarn start -c_ which will show the prompts again.

### Arguments

The app supports the following arguments:

```
  config:  --config or -c   	- Use to show configuration prompts
  example: --example or -e   	- Prints client-side examples to the console
  port:    --port or -p   	    - The port to run this app on (default: 9991)
  key:     --key or -k   	    - The Cloudinary cloud API key
  secret:  --secret or -s   	- The Cloudinary cloud API secret
  help:    --help or -?   	    - Show this help screen
  
```
 
## Code Examples

Running the app with: _yarn start -e_ will print out javascript examples on how to use *sign* and *prepare* with the upload widget.

