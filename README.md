# LetUs

> Event Planning Made Easy!

## Team

  - __Product Owner__: David An
  - __Scrum Master__: Wilson Ng
  - __Development Team Members__: Autumn Smith, Joe Denea

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Set to run at http://localhost:3000/

## Requirements

- Express 4.14.0
- Mongoose 4.7.6
- React
- Webpack 1.14.0
- Docker

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run dev
npm run start
```

### Docker Instructions
 - Download [Docker](https://docs.docker.com/engine/installation/)
  - Open Kitematic (GUI interface from the top bar)
 - Compose Docker containers. This will run the server/webpack/database: 
``` 
From directory
$ docker-compose up --build
```
 - Access Database 
  - Display all containers 
```  
$ docker ps
```
  - Use Mongo in Docker database container
```
From directory
$ docker exec -it letus_database_1 bash
$ mongo
$ use docker
```

### Roadmap

View the project roadmap [here](https://github.com/LegendaryLettuce/LetUs/issues)

![Flow Diagram](http://i.imgur.com/QKrwgEl.png?1)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
