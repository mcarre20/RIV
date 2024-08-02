import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const userDataStore = defineStore('userData', () => {
  const uid = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const userRole = ref('')
  const fullName = computed(() => `${firstName.value} ${lastName.value}`)
  const unsub = ref()
  const userProjects = ref([])
  const getProjectData = (projectId) => {
    const project = userProjects.value.find((p) => p.projectId === projectId)
    return project
  }

  const dataIsLoading = ref(false)
  //wathc auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // get user data
      dataIsLoading.value = true
      const docRef = doc(db, 'users', user.uid)
      const getUserData = async () => {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const userData = docSnap.data()
          firstName.value = userData.first_name
          lastName.value = userData.last_name
          userRole.value = userData.role
          uid.value = user.uid
        } else {
          console.log("user data doesn't exist")
        }
      }
      getUserData()
      // get user project
      const queryUserProjects = query(collection(db, 'projects'), where('owner', '==', user.uid))
      const unsubscribe = onSnapshot(queryUserProjects, (querySnapshop) => {
        const projects = []
        querySnapshop.forEach((doc) => {
          const data = doc.data()
          projects.push({
            projectId: doc.id,
            ...data,
            route: { name: 'project', params: { projectId: doc.id } }
          })
        })
        userProjects.value = projects
      })
      unsub.value = unsubscribe
      dataIsLoading.value = false
    }
  })

  return { uid, firstName, lastName, fullName, unsub, userProjects, getProjectData, dataIsLoading }
})
