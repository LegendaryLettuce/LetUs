# Using Selenium & Webdriver.io

Command line:
```
selenium-standalone install
selenium-standalone install --drivers.chrome.version=2.15 --drivers.chrome.baseURL=https://chromedriver.storage.googleapis.com
```
In a new tab:
```
selenium-standalone start
```

If there is already an instance running use:
```
lsof -i -n -P | grep 4444
kill (the process it says is on :4444)
```

While the selenium server is running, run the tests via json.config:
```
npm run client-tests
```
