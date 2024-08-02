import { createRouter, createWebHistory } from 'vue-router'
import CreateProject from '../views/CreateProject.vue'
import MyProjectsPage from '../views/MyProjectsPage.vue'
import NewResource from '../views/NewResource.vue'
import RoomManagePage from '../views/RoomManagePage.vue'
import SoftVersionPage from '../views/SoftVersionPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: RoomManagePage
    },
    {
      path: '/soft_version',
      component: SoftVersionPage
    },
    {
      path: '/:projectId',
      component: MyProjectsPage,
      name: 'project'
    },
    {
      path: '/new_project',
      component: CreateProject
    },
    {
      path: '/add',
      component: NewResource
    }
  ]
})

export default router
