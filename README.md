![Engage Spot Notion](https://user-images.githubusercontent.com/64391274/230778611-64589571-eaaa-4677-b115-7626978dd856.png)

# Good Vibes

An app that sends users a daily dose of inspirational quotes to uplift their mood and boost their motivation.

## How it Works?

Simple API where users can subscribe to inspirational quptes
Emails are send at Daily 6 AM using Cron Jobs

```
axios.post('localhost:3000/subscribe', {
    email: "hello@trial.com"
})
```

## Team members

1. [N Anbarasu](https://www.github.com/Darkphoenix2704)
2. [Rithu Reji](https://www.github.com/rithu111)

## Libraries used

Engagespot

express

## How to configure

```
yarn install
```

```
mv .env.example .env
```

Update API Keys

## How to Run

```
yarn start
```
