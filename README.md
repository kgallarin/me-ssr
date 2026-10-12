# kgallarin.com

My personal website that I built from scratch. Sharing my ideas and experience by this simple website.

## 👋🏼 About Me
I'm a Frontend Web Developer with experience in Laravel and GraphQL

## Live Link

https://kgallarin.com/

## Features

- About Kevin Gallarin
- Dark Mode
- Eye Candy
- Animation Techniques
- Tailwind setup
- Frontend testing
- SSR

## Tech Stack

**Frontend:** Vite, Nuxt, SplideJS, Pinia, TypeScript, TailwindCSS, Apollographql, Framer Motion

**Linters:** ESLint, StyleLint

**API:** Laravel, GraphQL

**Database:** MySQL

**Tests:** Vue Testing Library, Vitest

**Formatters:** Prettier

**Storage:** S3

**Server:** AWS Lightsail, Nginx

**Mailer:** Resend

## Run Locally

Clone the project

```bash
git clone https://github.com/kgallarin/me
```
Setup env
``` bash
copy env.example to .env
```

Install composer dependencies
```bash
$ composer install
```

Migrate the seeders, connected to S3 bucket
```bash
$ php artisan migrate --seed 
```

Install dependencies
```bash
$ npm install
```

Start the server

```bash
$ npm run dev
```

## Running Tests

To run frontend unit tests, run the following command

```bash
$ npm run test:unit
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MAIL_MAILER`

`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS_KEY`
`AWS_DEFAULT_REGION`
`AWS_BUCKET`
`AWS_URL`

## Authors

- [@kgallarin](https://github.com/kgallarin)


## Acknowledgements

Friends and colleagues who inspired me to build this website, allotted time for recommendations and feedback. You always inspire and push me forward. 💐


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](hhttps://www.linkedin.com/in/kmgallarin)

## License

MIT — see [LICENSE](LICENSE)


