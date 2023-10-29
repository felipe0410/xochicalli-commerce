import * as yup from 'yup'

export const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required('El correo no puede estar vacío')
        .email('Debe ser un correo válido'),
    password: yup
        .string()
        .required('La contraseña no puede estar vacía')
        .matches(
            // eslint-disable-next-line no-useless-escape
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
            'La contraseña debe contener al menos 1 letra minúscula, 1 letra mayúscula, 1 número y 1 caracter especial'
        )
        .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Las contraseñas deben ser idénticas')
        .required('Debes confirmar la contraseña'),
    name: yup
        .string()
        .required('El nombre no puede estar vacío')
        .min(4, 'El nombre debe tener mínimo 4 caracteres'),
    fatherSurname: yup
        .string()
        .required('El apellido paterno no puede estar vacío')
        .min(4, 'El apellido paterno debe tener mínimo 4 caracteres'),
    motherSurname: yup
        .string()
        .required('El apellido materno no puede estar vacío')
        .min(4, 'El apellido materno debe tener mínimo 4 caracteres'),
    birthday: yup
        .date()
        .required('La fecha de nacimiento es requerida')
        .max(new Date(), 'La fecha de nacimiento debe ser antes de hoy'),
    gender: yup
        .string()
        .required('Debes seleccionar un género')
        .oneOf(['Masculino', 'Femenino'], `El género debe ser "Masculino" o "Femenino"`),
    phoneNumber: yup
        .string()
        .required('El número de teléfono no puede estar vacío')
        .min(10, 'El número de teléfono debe ser de 10 dígitos')
        .max(10, 'El número de teléfono no puede tener más de 10 dígitos'),
    securitySelect: yup
        .string()
        .required('La pregunta de seguridad es requerida')
        .min(4, 'La respuesta es de mínimo 4 caracteres')
});