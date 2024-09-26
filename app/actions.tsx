'use server'
import { saltAndHashPassword } from "@/utils/password";

export async function createUser(formData: FormData) {
    debugger
    let pass = saltAndHashPassword(formData.get('password'));
    const rawFormData = {
      userName: formData.get('username'),
      password: pass
    }

    await fetch('http://localhost:3000/api/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rawFormData)
    })
}