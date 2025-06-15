import { signIn,signUp,signOut,confirmSignUp,fetchAuthSession,autoSignIn,resetPassword,confirmResetPassword    } from 'aws-amplify/auth';

export const login = async (form:{email:string,password:string})=>{
    try {
        const user = signIn({ username: form.email, password: form.password });
        console.log("User logged in", user);
    } catch (err) {
        console.error("Login error", err);
    }
}

export const register = async (form:{email:string,password:string})=>{
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: form.email,
            password: form.password,
            options: {
                userAttributes: {
                    email: form.email,
                },
            }
        });
console.log("User registered", isSignUpComplete, userId, nextStep);
    }catch(err){
        console.error("Register error", err);
    }
}

export const logout = async ()=>{
        try {
            await signOut()
        }catch(err){
            console.error("SignOut error", err);
        }
}

export const confirmAccount = async (form:{email:string,code:string})=>{
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: form.email,
            confirmationCode: form.code,
        });
        if(isSignUpComplete){
            await autoSignIn()
        }
        console.log("User confirmAccount", isSignUpComplete, nextStep);
    }catch(err){
        console.error("ConfirmSignUp error", err);
    }
}

export const forgotPassword = async (email:string)=>{
    try {
        const{nextStep,isPasswordReset} = await resetPassword({
            username: email
        });
        console.log(nextStep,isPasswordReset);
    }catch(err){
        console.error("ForgotPasswordError", err);
    }
}

export const resetUserPassword = async (form:{email:string,password:string,confirmationCode:string,})=>{
    try {
         await confirmResetPassword({
            username: form.email,
            confirmationCode: form.confirmationCode,
            newPassword: form.password,
        });
    }catch(err){
        console.error("ResetPasswordError", err);
    }
}

export const getAuthHeaders = async ()=> {
    try{
        const session = await fetchAuthSession();
        if(!session){
            return {};
        }
        const idToken = session.tokens?.idToken;
        const accessToken = session.tokens?.accessToken;
        console.log("Access Token", accessToken);
        console.log("Id Token", idToken);
        return { authorization: `Bearer ${accessToken}` }
    }catch(err){
        return {};
        console.warn(err)
    }
}



const isSessionExpired = async () => {
    try {
        const session = await fetchAuthSession();

        const expirationDate = session.credentials?.expiration;
        if (!expirationDate) return true; // If we can't determine expiration, treat it as expired

        const now = new Date();

        return expirationDate.getTime() < now.getTime();
    } catch (error) {
        console.error('Failed to fetch session:', error);
        return true; // Assume expired if fetching session fails
    }
};