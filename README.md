# Cloudinary Signed Upload Helper

The small server included in this repo can be used to test the creation of a signature for [signed uploads](https://cloudinary.com/documentation/upload_images#creating_api_authentication_signatures).
It supplies two endpoints for use with the [Upload Widget](https://cloudinary.com/documentation/upload_widget): _upload_signature_ and _prepare_upload_params_.

## Installation

* clone this repo to your local machine
* make sure you have nodejs installed (and preferably [yarn](https://yarnpkg.com/lang/en/docs/install/) too).
* after cloning run *yarn* or *npm i* at the root of your cloned repo

## Running

simply run: 

> yarn start

Running this app will make a nodejs server run over a specified port (default: 9991) which you can determine. 
Once running you can make an HTTP request to the following:

```
	http://localhost:9991/sign?param1=aaa&param2=bbbb
	
	or
	
	http://localhost:9991/prepare?param1=aaa&param2=bbbb
	
```

The first time you run the app it will prompt you to enter your cloud's key and secret which are needed to create the signature, as well as the port to run on.

The details you pass that first time will be saved locally for the next runs.

If you'd like to change one of these settings after the first time, run the app with: _yarn start -c_ which will show the prompts again.

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

for exmaple run:

```

yarn start -k "my_cloud_key" -s "my_cloud_secret"
```

> note: if you're on an old (pre v1.0.0) version of yarn or when using _npm run start_ you need to use -- before the parameters. like this:

```

npm run start -- -k "my_cloud_key" -s "my_cloud_secret" 
```

to change the key and secret to use for the signature without showing the prompts.
 
## Code Examples

Running the app with: _yarn start -e_ will print out javascript examples on how to use *sign* and *prepare* with the upload widget.

