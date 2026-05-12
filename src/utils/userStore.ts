import { ref, computed } from 'vue'

import * as newApi from "@/api/newApi/index";


interface UserInfo {
    userId: number
    id: number

    userNo?: string

    username: string

    nickname: string

    email?: string

    companyName?: string

    industry?: string

    phone?: string

    avatar?: string

    role: string

    balance?: number

    computePoints?: number

    wechatOpenId?: string

}



const user = ref<UserInfo | null>(null)

const token = ref(localStorage.getItem('token') || '')



export function useUser() {

    const isLoggedIn = computed(() => !!user.value || !!token.value)



    const login = async (userData: any) => {

        user.value = {

            ...userData,

            nickname: userData.nickname || userData.username || '平台用户',

            role: userData.role || 'user'

        }

        token.value = userData.accessToken

        localStorage.setItem('token', token.value)
        localStorage.setItem('refreshToken', userData.refreshToken)
        localStorage.setItem('user_info', JSON.stringify(user.value))
    }



    const logout = async () => {
        await newApi.apiLogout()
        user.value = null
        token.value = ''
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user_info')
    }



    const initUser = () => {

        const savedUser = localStorage.getItem('user_info')

        if (savedUser) {

            user.value = JSON.parse(savedUser)

        }

    }



    const refreshCredits = async () => {

        if (!user.value) return

        try {
            const res = await newApi.apiCreditBalance(user.value.userId)
            // const res = await fetch(`/api/billing/credit-balance?userId=${user.value.userId}`)
            const data = await res
            if (user.value) {

                user.value.computePoints = data.balance

                localStorage.setItem('user_info', JSON.stringify(user.value))

            }

        } catch (e) {

            console.error('Failed to refresh credits', e)

        }

    }



    const updateUserField = (fields: Partial<UserInfo>) => {
        if (!user.value) return
        Object.assign(user.value, fields)
        localStorage.setItem('user_info', JSON.stringify(user.value))
    }

    return {

        user,

        token,

        isLoggedIn,

        login,

        logout,

        initUser,

        refreshCredits,

        updateUserField

    }

}
