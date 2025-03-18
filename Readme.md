# HAKY Manager Backend EN

## Description

The **HAKY Manager Backend** is the server-side part of the system responsible for managing user data, productivity, calendars, profiles, salaries, and other core functionalities. This backend provides APIs for user registration, authentication, profile management, document uploads, and language updates.

## Technical Requirements

- Node.js v14+
- MongoDB
- TypeScript
- Development tools: `nodemon`, `ts-node`

## Environment Setup

1. **Clone the repository**:

   ```bash
   git clone <url>
   cd HAKY-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and fill it with the following content:

   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_USER=your-mongo-username
   MONGODB_PASSWORD=your-mongo-password
   MONGODB_URL=your-mongo-db-url
   JWT_SECRET=your-jwt-secret
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-user
   SMTP_PASSWORD=your-smtp-password
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   DROPBOX_APP_KEY=your-dropbox-app-key
   DROPBOX_APP_SECRET=your-dropbox-app-secret
   DROPBOX_REFRESH_TOKEN=your-dropbox-refresh-token
   ```

4. **Run the backend in development mode**:

   ```bash
   npm run dev
   ```

5. **Run in production mode**:

   ```bash
   npm start
   ```

## Main Endpoints

### Auth (Authentication)

- `POST /auth/register` - User registration.
- `POST /auth/login` - User login.
- `POST /auth/logout` - User logout.
- `POST /auth/refresh` - Refresh session.

### Profile

- `POST /profile/create` - Create user profile.
- `GET /profile` - Get user profile.
- `PUT /profile/update` - Update user profile.
- `POST /profile/documents/upload` - Upload document.
- `GET /profile/documents` - Get user documents.
- `DELETE /profile/documents` - Delete document.
- `GET /profile/documents/preview/:documentName` - Get document preview.

### Productivity

- `POST /productivity` - Set user productivity.
- `GET /productivity` - Get user productivity.

## Services

- **Auth**: Registration, login, sessions, password reset.
- **Profile**: User profile management, document uploads.
- **Productivity**: Track productivity.
- **Email**: Send password reset emails.
- **Cloudinary**: Upload and store images in the cloud.
- **Dropbox**: Dropbox integration.

## Dependencies

### Main:

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling.
- **JWT**: Authentication tokens.
- **Cloudinary**: File upload service.
- **Dropbox**: Dropbox integration.

### Development:

- **TypeScript**: Programming language.
- **Nodemon**: Auto-reloading during development.
- **Pino**: Logging.

## License

This project is licensed under the ISC License.

---

# HAKY Manager Backend UA

## Опис

**HAKY Manager Backend** — серверна частина системи, яка відповідає за управління даними користувачів, продуктивністю, календарями, профілями, зарплатами та іншими основними функціями. Цей бекенд надає API для реєстрації, авторизації, управління профілями, завантаження документів та оновлення мовних налаштувань.

## Технічні вимоги

- Node.js v14+
- MongoDB
- TypeScript
- Інструменти для розробки: `nodemon`, `ts-node`

## Інструкція з налаштування середовища

1. **Клонуйте репозиторій**:

   ```bash
   git clone <url>
   cd HAKY-manager
   ```

2. **Встановіть залежності**:

   ```bash
   npm install
   ```

3. **Створіть файл `.env`** у кореневій директорії та заповніть його наступним чином:

   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_USER=your-mongo-username
   MONGODB_PASSWORD=your-mongo-password
   MONGODB_URL=your-mongo-db-url
   JWT_SECRET=your-jwt-secret
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-smtp-user
   SMTP_PASSWORD=your-smtp-password
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   DROPBOX_APP_KEY=your-dropbox-app-key
   DROPBOX_APP_SECRET=your-dropbox-app-secret
   DROPBOX_REFRESH_TOKEN=your-dropbox-refresh-token
   ```

4. **Запустіть бекенд у режимі розробки**:

   ```bash
   npm run dev
   ```

5. **Запустіть у продуктивному середовищі**:

   ```bash
   npm start
   ```

## Основні ендпоїнти

### Auth (Аутентифікація)

- `POST /auth/register` - Реєстрація користувача.
- `POST /auth/login` - Логін користувача.
- `POST /auth/logout` - Логаут користувача.
- `POST /auth/refresh` - Оновлення сесії.

### Profile (Профіль)

- `POST /profile/create` - Створення профілю користувача.
- `GET /profile` - Отримання профілю користувача.
- `PUT /profile/update` - Оновлення профілю користувача.
- `POST /profile/documents/upload` - Завантаження документа.
- `GET /profile/documents` - Отримання документів користувача.
- `DELETE /profile/documents` - Видалення документа.
- `GET /profile/documents/preview/:documentName` - Перегляд документа.

### Productivity (Продуктивність)

- `POST /productivity` - Встановлення продуктивності користувача.
- `GET /productivity` - Отримання продуктивності.

## Сервіси

- **Auth**: Реєстрація, логін, сесії, відновлення пароля.
- **Profile**: Управління профілем користувача, завантаження документів.
- **Productivity**: Відстеження продуктивності.
- **Email**: Надсилання листів для відновлення пароля.
- **Cloudinary**: Завантаження та збереження файлів у хмару.
- **Dropbox**: Інтеграція з Dropbox.

## Залежності

### Основні:

- **Express**: Фреймворк для Node.js.
- **Mongoose**: Моделювання об'єктів MongoDB.
- **JWT**: Токени для аутентифікації.
- **Cloudinary**: Служба завантаження файлів.
- **Dropbox**: Інтеграція з Dropbox.

### Для розробки:

- **TypeScript**: Мова програмування.
- **Nodemon**: Автоматичне перезавантаження під час розробки.
- **Pino**: Логування.

## Ліцензія

Цей проєкт ліцензується відповідно до ліцензії ISC.
Based on the provided files, I can create a **README** for the frontend that will include all essential details about the setup, dependencies, and structure.

Here’s the **frontend README**:

---

# HAKY Manager Frontend EN

## Description

The **HAKY Manager Frontend** is the client-side part of the HAKY Manager system, built with **React**, **TypeScript**, and styled using **Tailwind CSS**. This app provides a responsive user interface for managing user profiles, productivity, salary details, calendar events, and other essential functionalities. It integrates with the backend API to provide authentication, user data management, and various other services.

## Technical Requirements

- **Node.js v14+**
- **React v18+**
- **TypeScript**
- **Tailwind CSS**
- **Redux** for state management
- **React Router** for navigation
- **i18next** for internationalization

## Environment Setup

1. **Clone the repository**:

   ```bash
   git clone <url>
   cd HAKY-manager/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and fill it with the following:

   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_ENV=development
   ```

4. **Run the development server**:

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Build the project for production**:

   ```bash
   npm run build
   ```

## Main Features

### Authentication

- User login, registration, and logout.
- Password reset functionality.
- JWT token-based session management.

### Profile Management

- Create, update, and view user profiles.
- Upload and manage documents.

### Productivity Tracking

- Track and manage user productivity.
- View personal productivity history.

### Calendar Management

- Submit and manage leave and workday requests.
- View and update calendar entries.

### Ranking and Salary Overview

- View departmental and individual rankings.
- Access salary history and details.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management library for handling global state.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router**: For routing and navigation.
- **i18next**: For multi-language support.
- **Axios**: For making HTTP requests.
- **Material-UI**: A React UI framework for building modern web apps.
- **Lottie React**: For adding animations.

## Redux Store Structure

- **auth**: Manages user authentication state.
- **profile**: Stores user profile data.
- **productivity**: Tracks productivity data.
- **salary**: Manages salary-related data.
- **calendar**: Stores calendar requests and data.
- **ranking**: Tracks and displays ranking information.
- **requests**: Manages requests for workdays, vacation, and other entries.

## File Structure

- **`src/`**: Contains all source code for the app.
  - **`components/`**: Reusable UI components (e.g., buttons, forms, modals).
  - **`pages/`**: Each route/page (e.g., home, profile, calendar).
  - **`redux/`**: Redux slices and state management.
  - **`hooks/`**: Custom hooks for various functionalities (e.g., API calls).
  - **`i18n.ts`**: i18n setup for handling translations.
  - **`index.tsx`**: The entry point for the application.

## Routing Overview

The application uses **React Router** for navigation. Below is an overview of the routes and components:

- **`/`**: HomePage
- **`/profile`**: ProfilePage (PrivateRoute)
- **`/profile/create`**: CreateProfile (PrivateRoute)
- **`/productivity`**: ProductivityPage (PrivateRoute)
- **`/salary`**: SalaryPage (PrivateRoute)
- **`/calendar`**: CalendarPage (PrivateRoute)
- **`/ranking`**: RankingPage (PrivateRoute)
- **`/coordinator`**: CoordinatorPage (CoordinatorRoute)

## Internationalization (i18n)

The frontend is configured with **i18next** to support multiple languages. Translation files are stored in the `public/locales` directory and include:

- `en/translation.json`
- `pl/translation.json`
- `ru/translation.json`
- `uk/translation.json`

## Dependencies

### Main dependencies:

- **React**: For building user interfaces.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: For styling.
- **React Router**: For routing.
- **Axios**: For making HTTP requests to the backend.
- **Material UI**: For pre-built components.
- **i18next**: For handling translations.
- **React-Redux**: For connecting Redux to React.
- **React Toastify**: For notifications.
- **Lottie React**: For adding animations.

### Development dependencies:

- **TypeScript**: For type safety.
- **PostCSS**: For CSS post-processing.
- **Autoprefixer**: For adding vendor prefixes to CSS.

## License

This project is licensed under the ISC License.
Ось README для фронтенду на українській мові:

---

# HAKY Manager Frontend UA

## Опис

**HAKY Manager Frontend** — це клієнтська частина системи HAKY Manager, розроблена за допомогою **React**, **TypeScript** та стилізована з використанням **Tailwind CSS**. Цей додаток надає чуйний інтерфейс для керування профілями користувачів, продуктивністю, зарплатою, календарними подіями та іншими основними функціями. Він інтегрується з бекенд API для надання функцій аутентифікації, управління даними користувачів та інших сервісів.

## Технічні вимоги

- **Node.js v14+**
- **React v18+**
- **TypeScript**
- **Tailwind CSS**
- **Redux** для управління станом
- **React Router** для навігації
- **i18next** для інтернаціоналізації

## Інструкція з налаштування середовища

1. **Клонуйте репозиторій**:

   ```bash
   git clone <url>
   cd HAKY-manager/frontend
   ```

2. **Встановіть залежності**:

   ```bash
   npm install
   ```

3. **Створіть файл `.env`** у кореневій директорії та заповніть його наступним чином:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

4. **Запустіть сервер для розробки**:

   ```bash
   npm start
   ```

   Додаток буде доступний за адресою [http://localhost:3000](http://localhost:3000).

5. **Побудуйте проєкт для продакшн середовища**:

   ```bash
   npm run build
   ```

## Основні функції

### Аутентифікація

- Логін, реєстрація та логаут користувача.
- Функціональність відновлення пароля.
- Управління сесією на основі токенів JWT.

### Управління профілем

- Створення, оновлення та перегляд профілю користувача.
- Завантаження та управління документами.

### Відстеження продуктивності

- Відстеження та управління продуктивністю користувачів.
- Перегляд історії продуктивності.

### Календар

- Надсилання та управління запитами на вихідні дні, відпустку та робочі дні.
- Перегляд і оновлення подій календаря.

### Рейтинг та зарплата

- Перегляд рейтингів за відділами та індивідуальних.
- Перегляд історії зарплат та деталей.

## Використані технології

- **React**: Бібліотека для створення користувацьких інтерфейсів.
- **Redux**: Бібліотека для управління станом.
- **Tailwind CSS**: Фреймворк для стилізації.
- **React Router**: Для навігації між сторінками.
- **i18next**: Для підтримки багатомовності.
- **Axios**: Для виконання HTTP запитів.
- **Material UI**: Для використання компонентів інтерфейсу.
- **Lottie React**: Для додавання анімацій.

## Структура Redux

- **auth**: Управління станом аутентифікації користувача.
- **profile**: Дані профілю користувача.
- **productivity**: Дані про продуктивність користувача.
- **salary**: Зарплатні дані.
- **calendar**: Дані про календарні запити та події.
- **ranking**: Дані про рейтинги.
- **requests**: Запити на відпустку, робочі дні тощо.

## Структура файлів

- **`src/`**: Всі джерельні файли додатку.
  - **`components/`**: Повторно використовувані компоненти UI (кнопки, форми, модалки).
  - **`pages/`**: Сторінки (головна, профіль, календар тощо).
  - **`redux/`**: Слайси та управління станом через Redux.
  - **`hooks/`**: Користувацькі хуки для різних функцій (наприклад, API запити).
  - **`i18n.ts`**: Налаштування i18n для роботи з перекладами.
  - **`index.tsx`**: Вхідна точка додатку.

## Огляд маршрутизації

Додаток використовує **React Router** для навігації. Ось огляд маршрутів і відповідних компонентів:

- **`/`**: HomePage
- **`/profile`**: ProfilePage (PrivateRoute)
- **`/profile/create`**: CreateProfile (PrivateRoute)
- **`/productivity`**: ProductivityPage (PrivateRoute)
- **`/salary`**: SalaryPage (PrivateRoute)
- **`/calendar`**: CalendarPage (PrivateRoute)
- **`/ranking`**: RankingPage (PrivateRoute)
- **`/coordinator`**: CoordinatorPage (CoordinatorRoute)

## Інтернаціоналізація (i18n)

Додаток налаштовано за допомогою **i18next** для підтримки кількох мов. Файли перекладів зберігаються в папці `public/locales` і включають:

- `en/translation.json`
- `pl/translation.json`
- `ru/translation.json`
- `uk/translation.json`

## Залежності

### Основні:

- **React**: Для побудови користувацьких інтерфейсів.
- **Redux Toolkit**: Для управління станом.
- **Tailwind CSS**: Для стилізації.
- **React Router**: Для навігації.
- **Axios**: Для виконання HTTP запитів.
- **Material UI**: Для використання готових компонентів.
- **i18next**: Для підтримки багатомовності.
- **React-Redux**: Для підключення Redux до React.
- **React Toastify**: Для сповіщень.
- **Lottie React**: Для додавання анімацій.

### Для розробки:

- **TypeScript**: Для безпечної типізації.
- **PostCSS**: Для обробки CSS.
- **Autoprefixer**: Для автоматичного додавання префіксів у CSS.

## Ліцензія

Цей проєкт ліцензується відповідно до ліцензії ISC.
