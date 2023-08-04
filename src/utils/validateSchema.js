import * as yup from 'yup';


export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export const signupSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required()
})

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

export const uploadVideoSchema = yup.object().shape({
    title: yup.string().min(5, 'The title must be atleast 5 characters').required('Title is required'),
    thumbnail: yup.mixed().required('Thumbnail is required')
        .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png", (value) => {
            return value && (
                value.type === "image/jpeg" ||
                value.type === "image/jpg" ||
                value.type === "image/png"
            );
        }),
    description: yup.string(),
    category: yup.string().notOneOf(['disabledValue'], 'Please select a category').required('Please select a category')
})

export const channelDetailsSchema = yup.object().shape({
    channelName: yup.string().required(),
    channelCategory: yup.string().required()
})

export const editVideoSchema = yup.object().shape({
    title: yup.string(),
    category: yup.string()
})
