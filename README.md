## Live site preview :rocket:
http://165.227.153.244:5173


## Local Installation 🛠
1. npm install -g lerna
2. npm install -g concurrently
3. Create a .env file in the root folder using .env.sample as a template.
```diff
**Warning**
For the purposes of this application copy the exact contents of .env.sample to the .env 
although this should never be done in a real production app.
```

4. run "npm run dev" 


## Docker setup
1. Create the .env file as above
2. run the command "docker-compose up --build"
