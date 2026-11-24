INSERT INTO roles (role_name, description)
VALUES ('supervisor', 'Supervisa la operación')
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO users (email, password, name, phone, is_active) VALUES
('ana@uniandes.edu.co',   '$scrypt$ln=17,r=8,p=1$5ekb7q5IrO+CuP1uIOm/Wg$VEEamowtTqT3V0ZNmU1J9/4dUlqHe+Af71rs4MkfF5I', 'Ana',   '3001234567', TRUE),
('luis@uniandes.edu.co',  '$scrypt$ln=17,r=8,p=1$5ekb7q5IrO+CuP1uIOm/Wg$VEEamowtTqT3V0ZNmU1J9/4dUlqHe+Af71rs4MkfF5I', 'Luis',  NULL,         TRUE),
('pedro@uniandes.edu.co', '$scrypt$ln=17,r=8,p=1$5ekb7q5IrO+CuP1uIOm/Wg$VEEamowtTqT3V0ZNmU1J9/4dUlqHe+Af71rs4MkfF5I', 'Pedro', NULL,         FALSE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'ana@uniandes.edu.co' AND r.role_name = 'supervisor'
ON CONFLICT DO NOTHING;