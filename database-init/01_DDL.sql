-- 1. ODSTRANĚNÍ EXISTUJÍCÍCH TABULEK (pro čistý start)
DROP TABLE IF EXISTS meals_alergens CASCADE;
DROP TABLE IF EXISTS orders_history CASCADE;
DROP TABLE IF EXISTS meals_history CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS alergens CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. VYTVOŘENÍ TABULEK

-- Tabulka uživatelů
CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255)       NOT NULL,
    balance  DECIMAL(10, 2) DEFAULT 0.00
);

-- Tabulka alergenů
CREATE TABLE alergens
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabulka jídel
CREATE TABLE meals
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    category    VARCHAR(50),
    image_url   TEXT,
    carbs       INT,
    fats        INT,
    proteins    INT,
    weight      INT,
    kcal        INT
);

-- Tabulka hodnocení (propojení uživatel - jídlo)
CREATE TABLE ratings
(
    meal_id INT REFERENCES meals (id) ON DELETE CASCADE,
    user_id INT REFERENCES users (id) ON DELETE CASCADE,
    rating  VARCHAR(10) CHECK (rating IN ('LIKED', 'DISLIKED')),
    PRIMARY KEY (meal_id, user_id)
);

-- Tabulka historie nabídky jídel
CREATE TABLE meals_history
(
    id      SERIAL PRIMARY KEY,
    date    DATE           NOT NULL,
    meal_id INT REFERENCES meals (id) ON DELETE CASCADE,
    price   DECIMAL(10, 2) NOT NULL
);

-- Tabulka historie objednávek (kdo co kdy koupil)
CREATE TABLE orders_history
(
    id      SERIAL PRIMARY KEY,
    date    DATE           NOT NULL,
    meal_id INT REFERENCES meals (id),
    user_id INT REFERENCES users (id),
    price   DECIMAL(10, 2) NOT NULL
);

-- Vazební tabulka mezi jídly a alergeny
CREATE TABLE meals_alergens
(
    meal_id    INT REFERENCES meals (id) ON DELETE CASCADE,
    alergen_id INT REFERENCES alergens (id) ON DELETE CASCADE,
    value      VARCHAR(10),
    PRIMARY KEY (meal_id, alergen_id)
);