import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../redux/projectSlice'
import taskReducer from '../redux/taskSlice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer
  }
})
