<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import FloatingService from './components/FloatingService.vue'


const route = useRoute()
const hideNavRoutes = ['AdminDashboard', 'AdminArticles', 'AdminEvents', 'AdminUsers', 'AdminAdmins', 'AdminCases', 'AdminIntro', 'GroupUsage', 'LoginPassword', 'ParkCollaborationLogin', 'ParkCollaborationAuth', 'ParkCollaborationWorkbench', 'DigitalVideoLogin', 'DigitalVideoAuth', 'DigitalVideoWorkbench', 'EcommercePracticeWorkbench', 'EcommerceAskLogin', 'EcommerceAskAuth']
const showNav = computed(() => {
  if (route.path.startsWith('/admin')) return false
  const path = route.path
  if (path.includes('/login') || path.includes('/register')) return false
  if (hideNavRoutes.includes(route.name as string)) return false
  return true
})

// UTM Tracking Logic
import { onMounted } from 'vue'

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const source = params.get('utm_source')
  
  if (source) {
    const medium = params.get('utm_medium')
    const campaign = params.get('utm_campaign')
    
    // Save to session for registration
    sessionStorage.setItem('utm_source', source)
    if (medium) sessionStorage.setItem('utm_medium', medium)
    if (campaign) sessionStorage.setItem('utm_campaign', campaign)
    
    // Record Visit API
    fetch('/api/stats/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utmSource: source,
        utmMedium: medium,
        utmCampaign: campaign,
        isRegistered: false // Just a visit
      })
    }).catch(err => console.error('Stats error', err))
  }
})
</script>

<template>
  <NavBar v-if="showNav" />
  <RouterView />
  <AppFooter v-if="showNav" />
  <FloatingService v-if="showNav" />

</template>
