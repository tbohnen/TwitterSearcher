
## Concept
To search for a hashtag and save for later reading

## Notes

1. Decide to use the app to query twitter instead of pass through, depending on the strategy it might make more sense to use client only; We can also use something like pouchdb to save in isolated storage and in that way have no api requirement. The way I did it is arguably a bit easier to port to mobile. 
2. ui needs work :-)
3. would want to add a mark as read on the saved tweets
4. loading indicator
5. better error handling server as well as client side
6. make it a bit more generic to not only search for hashtags (very easy, kept to requirement).
7. allow more than 15 tweets on the search
8. need some refactoring, especially on react side.
9. haven't tested it from clean repo, might have missed some dependencies in package.json file
10. can switch to stream api but given search, the normal twitter api is fine

## Config
create a twitter app in developer console to get key and secret and update config.js

## to start 
1. run npm start in /client
2. run node app.js in root