CREATE TABLE "koalas" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INT NOT NULL,
    "ready_to_transfer" TEXT NOT NULL,
    "notes" TEXT
);