# idris-galiyara-MovieApp

## Sample .env File

> PORT = 3000<br/>
> NODE_ENV = Dev<br/>
> API_PROVIDER = rapidapi<br/>
> REDIS_PORT = 6379<br/>
> REDIS_HOST = localhost<br/>
> MOVIE_LIST_EXPIRES_IN = 36000<br/>
> API_KEY = ac27120843mshc63fcbfdce42f56p10fa3bjsnaac6bebdae29<br/>
> PROVIDER_URL = https://imdb8.p.rapidapi.com<br/>
> API_PROVIDER_HOST = imdb8.p.rapidapi.com<br/>
> API_PROVIDER_USE_API_KEY = true<br/>

Please note that in order to start this app you will require a \*\*\*'.env'\_\*\* file in the root folder of app <br/>
Movie API Provider End point and Secret key has been Configured on below file<br/>

> .env

for configurable BaseURl and version wise route follow below path<br/>

> MovieApp > config > constant.json <br/>


For cache redis has been use and its needs to be install on code running machine
redis configration has been put in .env <br/>

>REDIS_PORT = 6379 <br/>
>REDIS_HOST = localhost <br/>

To start app please follow below commands<br/>

> npm install<br/>
> npm start<br/>
> Postman Collection
> https://www.getpostman.com/collections/b38bb5d4da3b768fd1e4
