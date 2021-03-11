create TABLE IF NOT EXISTS user_roles
(
    user_role_id            serial PRIMARY KEY,
    user_id               INTEGER NOT NULL,
    role                   VARCHAR(100)
)
