import {getAuthHeaders} from "./auth.ts";
import {getCurrentUser} from "aws-amplify/auth";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
type signInDetails ={
    loginId: string
}

type AuthUser = {
    userId:string,
    username: string,
    signInDetails: signInDetails
}

export const fetchGame = async (level: string, operator: string)=>{
    try {
        const authHeader = await getAuthHeaders()
        const game = await fetch(`${BACKEND_URL}/game?operation=${operator}&level=${level}`, {
            headers: {
                ...authHeader,
            }
        })
        return await game.json();
    } catch (e) {
        console.error(e);
    }
}

export const setUserScore = async (userScore: number,level:string) => {
    try {
        const authHeader = await getAuthHeaders();
        const user = await  getCurrentUser() as AuthUser;
        console.log({user: userScore,email:user.signInDetails.loginId,level});
        const score = await fetch(`${BACKEND_URL}/score`, {
            method: "POST",
            headers: {
                ...authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({score: userScore,user:user.signInDetails.loginId,level}),
        })
         const res =await score.json();
        console.log({res});
        return res;
    }catch(err){
        console.error(err);
    }
}

export const fetchLeaderboard = async () => {
    try {
        const authHeader = await getAuthHeaders();
        const leaderboard = await fetch(`${BACKEND_URL}/leaderboard`, {
            headers: {
                ...authHeader,
            }
        })
        return await leaderboard.json();
    }catch (e){
        console.error(e);
    }
}

export const gameOverMessage = (score: number) => {
    let message ="";
    switch (true) {
        case score >= 500:
            message = "Excellent work!";
            break;
        case score >= 200:
            message = "Great job!";
            break;
        case score >= 100:
            message = "Nice effort!";
            break;
        case score >= 50:
            message = "Keep practicing!";
            break;
        default:
            message=" Don't give up! Try again!"
    }

    return message;
}