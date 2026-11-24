INSERT INTO roles (role_name, description)
VALUES ('admin', 'Administrador del sistema')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO users (email, password, name)
VALUES ('admin@uniandes.edu.co', '$scrypt$ln=17,r=8,p=1$gBlUONNdUig5JAyTj0MdgQ$MXSB9+Ys0lt+TREx00LsKK/FvZlKCGJBF6Qzxj5tnv4', 'Administrador')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@uniandes.edu.co' AND r.role_name = 'admin'
ON CONFLICT DO NOTHING;
