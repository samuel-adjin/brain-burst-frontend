const DEFAULT_BACKEND_URL = "http://localhost:9000";
const LAMBDA_BACKEND_URL = import.meta.env.LAMBDA_BACKEND_URL ?? DEFAULT_BACKEND_URL;


import { Amplify } from 'aws-amplify';
import type { ResourcesConfig } from 'aws-amplify';



export const amplifyConfig: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.USER_POOL_ID,
            userPoolClientId: import.meta.env.USER_POOL_CLIENT_ID,
            loginWith: {
                email: true
            },
            signUpVerificationMethod: 'code',
            userAttributes: {
                email: {
                    required: true
                },
                phone_number: {
                    required: false
                },
                given_name: {
                    required: false
                },
                family_name: {
                    required: false
                }
            },
            passwordFormat: {
                minLength: 4,
                requireLowercase: true,
                requireUppercase: true,
                requireNumbers: true,
                requireSpecialCharacters: true
            },
        }
    }
};

Amplify.configure(amplifyConfig);
