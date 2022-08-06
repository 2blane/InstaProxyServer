# BLANE COMMENTS

# How to Call the Instagram API

Instagram constantly changes how their auth scheme works to prevent people from ripping their data. So we have to spin-up a docker container, log the user into the platform, and then do a bunch of cookie/auth stuff to call their API.

## Step 1.A - Build and Run the Docker Container Interactively
Run the following to build the docker container, kill old containers, and run the container.
`docker kill $(docker ps -q) ; docker build -t latest -t instaproxy . && docker run -ti -p 8080:8080 -e ENABLE_LOG=true -e INSTAGRAM_USERNAME=pirayes645 -e INSTAGRAM_PASSWORD=DongFloppers4 -e API_KEY=kxcvoierewrlkn -e PORT=8080 instaproxy`

## Step 1.B - Build and Run the Docker Container Detached
Run the following to build the docker container, kill old containers, and run the container.
`docker kill $(docker ps -q) ; docker build -t latest -t instaproxy . && docker run -dti -p 8080:8080 -e ENABLE_LOG=true -e INSTAGRAM_USERNAME=pirayes645 -e INSTAGRAM_PASSWORD=DongFloppers4 -e API_KEY=kxcvoierewrlkn -e PORT=8080 instaproxy`

## Step 2 - Call the Instagram API
Once the docker container is running, call it's api method /v1?url={insta api url} like so:
`curl 'http://localhost:8080/v1?key=kxcvoierewrlkn&url=https://i.instagram.com/api/v1/users/web_profile_info/?username=therock'`

You can replace `therock` with the instagram username you want to get data about. The data is returned as JSON and represents public information about their profile.

## Resources
The GitHub repository for the Docker Container
https://github.com/ThinhVu/InstaProxyServer

The Docker repository
https://hub.docker.com/r/dockerer123456/insta-proxy-server

The StackOverflow discussion about Instagram if their methods change
https://stackoverflow.com/questions/11796349/instagram-how-to-get-my-user-id-from-username/38342137#38342137

## Next Steps
1. Run this container in our AWS cloud and make it accessible from our Runner Server instances.
2. The Geoji API should call this container's API to get back the JSON data about the user in question.
3. How do we make sure the container is always logged in? What happens if the container fails? For now, let's get a Slack notification through the Geoji API. Let's see how long this thing can last. Will it be a constant battle? Who knows.

# ORIGINAL PROJECT BELOW HERE

# INTRODUCTION

It's been 6 years, Instagram has challenged us a lots with their *public* api.

With a ton of work to implement Instagram application with OAuth stuff.

All we want is making a curl request and the data must be present in response data. That's all.

It's a time to get rid of this stupid issue.

--

I know this war will never end. And the win side is always Instagram, but I'll try my best to fight back.

My bruh, show me your support via: paypal.me: paypal.me/vutro

# GUIDE

For latest update, please visit following SO thread:

https://stackoverflow.com/questions/11796349/instagram-how-to-get-my-user-id-from-username/38342137#38342137


# RESOURCES

There is a prebuilt Docker image, you can using it instead.

https://hub.docker.com/repository/docker/dockerer123456/insta-proxy-server


# DEMO

NOTE THAT: This demo video may be outdated over time, but the code & Docker image is always the latest.

https://www.youtube.com/watch?v=frHC1jOfK1k
